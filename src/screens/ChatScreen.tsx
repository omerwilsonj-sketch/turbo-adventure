import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { ChatMessage, ChatChannel } from '../types/chat';
import { COLORS, SPACING } from '../constants/theme';

interface Props {
  userId: string;
  userEmail: string;
}

export default function ChatScreen({ userId, userEmail }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChatChannel | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      fetchMessages(selectedChannel.id);
      
      const channel = supabase
        .channel(`chat_messages:channel_id=eq.${selectedChannel.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `channel_id=eq.${selectedChannel.id}`,
          },
          (payload) => {
            const msg = payload.new as ChatMessage;
            setMessages((prev) => [...prev, msg]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedChannel]);

  async function fetchChannels() {
    try {
      const { data, error } = await supabase
        .from('chat_channels')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) {
        setChannels(data);
        if (data.length > 0) setSelectedChannel(data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching channels:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages(channelId: string) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) setMessages(data);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim() || !selectedChannel) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    try {
      const { error } = await supabase.from('chat_messages').insert([
        {
          channel_id: selectedChannel.id,
          user_id: userId,
          user_email: userEmail,
          content: messageContent,
        },
      ]);

      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error sending message', error.message);
    }
  }

  async function uploadImage() {
    Alert.alert('VAULT', 'Progress photo storage is exclusive to Core and VIP members.');
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMine = item.user_id === userId;
    return (
      <View style={[styles.messageBubble, isMine ? styles.myMessage : styles.theirMessage]}>
        {!isMine && <Text style={styles.senderEmail}>{item.user_email?.split('@')[0]}</Text>}
        <Text style={[styles.messageText, isMine ? styles.myMessageText : styles.theirMessageText]}>
          {item.content}
        </Text>
        <Text style={[styles.timestamp, isMine && { color: 'rgba(255,255,255,0.5)' }]}>
          {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.channelHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelScroll}>
          {channels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={[
                styles.channelTab,
                selectedChannel?.id === channel.id && styles.activeChannelTab,
              ]}
              onPress={() => setSelectedChannel(channel)}
            >
              <Text
                style={[
                  styles.channelTabText,
                  selectedChannel?.id === channel.id && styles.activeChannelTabText,
                ]}
              >
                {channel.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton} onPress={uploadImage}>
            <Text style={styles.attachButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Direct message to coach..."
            placeholderTextColor="#444"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  channelHeader: { borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingVertical: 15 },
  channelScroll: { paddingHorizontal: SPACING.md },
  channelTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: COLORS.surface, marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  activeChannelTab: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  channelTabText: { fontSize: 10, fontWeight: '800', color: COLORS.textSecondary, letterSpacing: 1 },
  activeChannelTabText: { color: '#fff' },
  messageList: { padding: SPACING.lg },
  messageBubble: { maxWidth: '85%', padding: 12, borderRadius: 16, marginBottom: 12 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: COLORS.primary },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  messageText: { fontSize: 15, color: COLORS.text, lineHeight: 20 },
  myMessageText: { color: '#fff' },
  theirMessageText: { color: COLORS.text },
  senderEmail: { fontSize: 10, fontWeight: '800', color: COLORS.primary, marginBottom: 4, textTransform: 'uppercase' },
  timestamp: { fontSize: 9, color: COLORS.textSecondary, marginTop: 6, alignSelf: 'flex-end', fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border, alignItems: 'center', backgroundColor: COLORS.background },
  attachButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  attachButtonText: { fontSize: 20, color: COLORS.primary, lineHeight: 24 },
  input: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, color: COLORS.text, fontSize: 14, marginRight: 10, maxHeight: 100, borderWidth: 1, borderColor: COLORS.border },
  sendButton: { backgroundColor: COLORS.primary + '22', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.primary },
  sendButtonText: { color: COLORS.primary, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
});
