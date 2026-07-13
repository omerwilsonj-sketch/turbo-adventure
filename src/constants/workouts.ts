import { WorkoutSession } from '../types/workout';

export const WORKOUTS: WorkoutSession[] = [
  {
    id: 'p1-w1-d1',
    title: 'Phase 1 - Week 1 - Monday',
    phase: 1,
    week: 1,
    day: 'Monday',
    warmup: {
      duration: 3,
      description: 'Dynamic Warm-up: Raise heart rate, activate key muscle groups',
    },
    workBlock1: {
      title: 'Strength Focus',
      duration: 11,
      format: '3 sets of 10 reps',
      exercises: [
        {
          id: 'goblet-squat',
          name: 'Goblet Squat',
          targetSets: 3,
          targetReps: 10,
          videoUrl: 'https://example.com/video/goblet-squat',
        },
      ],
    },
    workBlock2: {
      title: 'Metabolic Finisher',
      duration: 11,
      format: '5 Rounds: :30 work / :30 rest',
      exercises: [
        {
          id: 'kettlebell-swing',
          name: 'Kettlebell Swing',
          videoUrl: 'https://example.com/video/kb-swing',
        },
        {
          id: 'full-push-up',
          name: 'Full Push-Up',
          videoUrl: 'https://example.com/video/push-up',
        },
      ],
    },
    cooldown: {
      duration: 5,
      description: 'Cool-down & Mobility: Stretch, breathe, set intention',
    },
  },
  {
    id: 'p1-w1-d3',
    title: 'Phase 1 - Week 1 - Wednesday',
    phase: 1,
    week: 1,
    day: 'Wednesday',
    warmup: {
      duration: 3,
      description: 'Dynamic Warm-up',
    },
    workBlock1: {
      title: 'Strength Focus',
      duration: 11,
      format: '3 sets of 10 reps',
      exercises: [
        {
          id: 'dumbbell-bench-press',
          name: 'Dumbbell Bench Press',
          targetSets: 3,
          targetReps: 10,
          videoUrl: 'https://example.com/video/db-bench-press',
        },
      ],
    },
    workBlock2: {
      title: 'Metabolic Finisher',
      duration: 11,
      format: '5 Rounds: :30 work / :30 rest',
      exercises: [
        {
          id: 'reverse-lunge',
          name: 'Reverse Lunge',
          videoUrl: 'https://example.com/video/walking-lunge',
        },
        {
          id: 'dumbbell-row-bent-over',
          name: 'Dumbbell Row (Bent-Over)',
          videoUrl: 'https://example.com/video/bent-over-row',
        },
      ],
    },
    cooldown: {
      duration: 5,
      description: 'Cool-down & Mobility',
    },
  },
];
