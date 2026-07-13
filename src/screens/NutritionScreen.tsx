import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { MacroTargets, FoodLog } from '../types/nutrition';
import { getMacroTargets } from '../lib/nutrition';
import { COLORS, SPACING } from '../constants/theme';

interface Props {
  userId: string;
}

export default function NutritionScreen({ userId }: Props) {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [targets, setTargets] = useState<MacroTargets>({
    calories: 2500,
    protein: 170,
    carbs: 250,
    fat: 80,
  });
  const [consumed, setConsumed] = useState<MacroTargets>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  useEffect(() => {
    fetchLogs();
    const t = getMacroTargets(2500, 80, 'recomp');
    setTargets(t);
  }, []);

  useEffect(() => {
    const summary = logs.reduce(
      (acc, log) => ({
        calories: acc.calories + (log.calories * log.servings),
        protein: acc.protein + (log.protein * log.servings),
        carbs: acc.carbs + (log.carbs * log.servings),
        fat: acc.fat + (log.fat * log.servings),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    setConsumed(summary);
  }, [logs]);

  async function fetchLogs() {
    const today = new Date().toISOString().split('T')[0];
    try {
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', today);

      if (error) throw error;
      if (data) setLogs(data);
    } catch (error: any) {
      console.log('Error fetching nutrition logs:', error.message);
    }
  }

  async function handleAddFood() {
    const log: FoodLog = {
      user_id: userId,
      date: new Date().toISOString(),
      food_name: newFood.name,
      calories: parseInt(newFood.calories) || 0,
      protein: parseInt(newFood.protein) || 0,
      carbs: parseInt(newFood.carbs) || 0,
      fat: parseInt(newFood.fat) || 0,
      servings: 1,
    };

    try {
      const { data, error } = await supabase.from('nutrition_logs').insert([log]).select();
      if (error) throw error;
      if (data) {
        setLogs([...logs, data[0]]);
        setIsModalVisible(false);
        setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
      }
    } catch (error: any) {
      Alert.alert('Error saving log', error.message);
    }
  }

  const ProgressBar = ({ label, current, target, color }: any) => {
    const progress = Math.min(current / target, 1);
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressLabel}>{label.toUpperCase()}</Text>
          <Text style={styles.progressValue}>{Math.round(current)} / {target}g</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.caloriesCard}>
          <Text style={styles.caloriesTitle}>REMAINING CALORIES</Text>
          <Text style={styles.caloriesValue}>{Math.max(0, targets.calories - consumed.calories)}</Text>
          <Text style={styles.caloriesSub}>OF {targets.calories} KCAL</Text>
        </View>

        <View style={styles.macrosSection}>
          <ProgressBar label="Protein" current={consumed.protein} target={targets.protein} color={COLORS.error} />
          <ProgressBar label="Carbs" current={consumed.carbs} target={targets.carbs} color={COLORS.primary} />
          <ProgressBar label="Fat" current={consumed.fat} target={targets.fat} color="#FFCC00" />
        </View>

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>TODAY'S LOG</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.addButtonText}>+ ADD FOOD</Text>
            </TouchableOpacity>
          </View>
          {logs.length === 0 ? (
            <Text style={styles.emptyText}>No food logged yet today.</Text>
          ) : (
            logs.map((log, index) => (
              <View key={log.id || index} style={styles.logItem}>
                <View>
                  <Text style={styles.logName}>{log.food_name}</Text>
                  <Text style={styles.logMacros}>P: {log.protein}g | C: {log.carbs}g | F: {log.fat}g</Text>
                </View>
                <Text style={styles.logCals}>{log.calories} kcal</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD FOOD</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>FOOD NAME</Text>
              <TextInput
                style={styles.input}
                value={newFood.name}
                onChangeText={(t) => setNewFood({ ...newFood, name: t })}
                placeholder="Chicken breast, 200g..."
                placeholderTextColor="#444"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputCol}>
                <Text style={styles.inputLabel}>CALORIES</Text>
                <TextInput
                  style={styles.input}
                  value={newFood.calories}
                  onChangeText={(t) => setNewFood({ ...newFood, calories: t })}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#444"
                />
              </View>
              <View style={styles.inputCol}>
                <Text style={styles.inputLabel}>PROTEIN (G)</Text>
                <TextInput
                  style={styles.input}
                  value={newFood.protein}
                  onChangeText={(t) => setNewFood({ ...newFood, protein: t })}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#444"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputCol}>
                <Text style={styles.inputLabel}>CARBS (G)</Text>
                <TextInput
                  style={styles.input}
                  value={newFood.carbs}
                  onChangeText={(t) => setNewFood({ ...newFood, carbs: t })}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#444"
                />
              </View>
              <View style={styles.inputCol}>
                <Text style={styles.inputLabel}>FAT (G)</Text>
                <TextInput
                  style={styles.input}
                  value={newFood.fat}
                  onChangeText={(t) => setNewFood({ ...newFood, fat: t })}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#444"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddFood}>
              <Text style={styles.saveButtonText}>SAVE LOG</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: SPACING.lg },
  caloriesCard: { 
    backgroundColor: COLORS.surface, 
    padding: 40, 
    borderRadius: 24, 
    alignItems: 'center', 
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  caloriesTitle: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary, letterSpacing: 2, marginBottom: 10 },
  caloriesValue: { fontSize: 56, fontWeight: '900', color: COLORS.text },
  caloriesSub: { fontSize: 10, color: COLORS.textSecondary, letterSpacing: 1, marginTop: 5 },
  macrosSection: { marginBottom: 30 },
  progressContainer: { marginBottom: 20 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textSecondary, letterSpacing: 1 },
  progressValue: { fontSize: 12, fontWeight: '600', color: COLORS.text },
  progressTrack: { height: 6, backgroundColor: COLORS.surface, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  historySection: { marginBottom: 40 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, letterSpacing: 1 },
  addButton: { backgroundColor: COLORS.primary + '22', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary },
  addButtonText: { color: COLORS.primary, fontSize: 10, fontWeight: '800' },
  logItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  logName: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  logMacros: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  logCals: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  modalContainer: { flex: 1, backgroundColor: COLORS.background },
  modalHeader: { padding: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: COLORS.text, letterSpacing: 1 },
  closeButtonText: { color: COLORS.error, fontSize: 12, fontWeight: '800' },
  modalContent: { padding: SPACING.lg },
  inputContainer: { marginBottom: 20 },
  inputLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textSecondary, marginBottom: 8, letterSpacing: 1 },
  input: { height: 55, backgroundColor: COLORS.surface, borderRadius: 12, paddingHorizontal: 16, color: COLORS.text, fontSize: 16, borderWidth: 1, borderColor: COLORS.border },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputCol: { width: '48%' },
  saveButton: { backgroundColor: COLORS.primary, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 30, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
});
