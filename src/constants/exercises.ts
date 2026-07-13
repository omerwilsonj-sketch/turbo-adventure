import { Exercise } from '../types/workout';

export const EXERCISES: Exercise[] = [
  {
    "id": "bodyweight-squat",
    "name": "Bodyweight Squat",
    "category": "Squat Pattern",
    "tier": "Beginner",
    "target": "Quads, glutes, core",
    "equipment": "None",
    "setup": "Feet shoulder-width apart, toes slightly turned out (5–15°). Arms extended forward or hands at chest. Spine neutral, chest up.",
    "execution": "Initiate by pushing hips back. Descend until thighs are parallel to floor (or as low as mobility allows). Drive through mid-foot to stand. Knees track in line with toes — do not cave inward.",
    "breathing": "Inhale on descent. Exhale on ascent.",
    "commonMistakes": [
      "Heels lifting off floor (tighten calves or widen stance)",
      "Knees collapsing inward (cue \"spread the floor\" with feet)",
      "Rounding lower back (brace core)"
    ],
    "progression": "Goblet Squat (add weight).",
    "regression": "Box Squat (sit to a chair, stand up)."
  },
  {
    "id": "goblet-squat",
    "name": "Goblet Squat",
    "category": "Squat Pattern",
    "tier": "Beginner",
    "target": "Quads, glutes, core",
    "equipment": "Dumbbell or kettlebell",
    "setup": "Hold one end of a dumbbell vertically at chest, elbows tucked in. Feet shoulder-width apart.",
    "execution": "Same as bodyweight squat but the weight acts as a counterbalance, allowing a deeper squat. Keep the weight pressed against the chest.",
    "breathing": "Inhale down, exhale up.",
    "commonMistakes": [
      "Elbows flaring out (tuck them)",
      "Weight drifting away from chest (pull it in)"
    ],
    "progression": "Increase weight. Front Squat."
  },
  {
    "id": "front-squat-dumbbell",
    "name": "Front Squat (Dumbbell)",
    "category": "Squat Pattern",
    "tier": "Intermediate",
    "target": "Quads, glutes, upper back",
    "equipment": "Two dumbbells",
    "setup": "Rack two dumbbells on shoulders, palms facing each other, elbows high. Feet shoulder-width.",
    "execution": "Descend with upright torso. Keep elbows up throughout — if elbows drop, the weight pulls you forward. Drive up through the mid-foot.",
    "breathing": "Inhale at top, brace, descend. Exhale at top of ascent.",
    "commonMistakes": [
      "Elbows dropping (cue \"show your armpits to the mirror\")",
      "Leaning forward (mobility issue — elevate heels on a plate)"
    ],
    "progression": "Barbell Front Squat."
  },
  {
    "id": "bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "category": "Squat Pattern",
    "tier": "Advanced",
    "target": "Quads, glutes, single-leg stability",
    "equipment": "Dumbbells (optional), bench/box",
    "setup": "Place rear foot on a bench/box behind you. Front foot far enough forward that your shin is vertical at the bottom. Hold dumbbells at sides (optional).",
    "execution": "Descend by bending the front knee. Keep torso upright. Back knee hovers just above the floor. Drive through the front heel to stand.",
    "breathing": "Inhale down, exhale up.",
    "commonMistakes": [
      "Front knee traveling past the toes excessively (move front foot farther forward)",
      "Weight on back leg (should be 90% on front leg)"
    ],
    "progression": "Add weight. Elevate front foot (deficit)."
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse Lunge",
    "category": "Squat Pattern",
    "tier": "Beginner–Intermediate",
    "target": "Quads, glutes, hamstrings",
    "equipment": "Dumbbells (optional)",
    "setup": "Stand tall, feet hip-width. Hold dumbbells at sides if using weight.",
    "execution": "Step backward with one leg. Both knees bend to 90°. Front shin vertical, back knee hovering above ground. Drive through the front heel to return to standing.",
    "breathing": "Inhale as you lunge back. Exhale as you drive forward.",
    "commonMistakes": [
      "Lunging too short (front knee travels past toes)",
      "Leaning forward (keep chest tall)"
    ],
    "progression": "Walking Lunge (forward). Jump Lunge."
  },
  {
    "id": "forward-lunge",
    "name": "Forward Lunge",
    "category": "Squat Pattern",
    "tier": "Intermediate",
    "target": "Quads, glutes, balance",
    "equipment": "Dumbbells",
    "setup": "Stand tall, dumbbells at sides.",
    "execution": "Step forward with one leg. Land on the heel, then flatten the foot. Both knees bend to 90°. Push off the front foot to return to start.",
    "breathing": "Inhale on step-in. Exhale on push-back.",
    "commonMistakes": [
      "Stride too short (knee over-toes)",
      "Stride too long (loss of balance)"
    ],
    "progression": "Walking Lunge (continuous forward steps)."
  },
  {
    "id": "box-step-up",
    "name": "Box Step-Up",
    "category": "Squat Pattern",
    "tier": "Beginner–Intermediate",
    "target": "Quads, glutes",
    "equipment": "Box/bench (12–24\"), dumbbells",
    "setup": "Stand facing the box. Hold dumbbells at sides. Place entire front foot on the box.",
    "execution": "Drive through the front heel to stand on the box. Step down with the same foot. Do not push off the back foot.",
    "breathing": "Exhale to step up. Inhale to step down.",
    "commonMistakes": [
      "Using the back leg to push off (rest the back foot gently, no push)",
      "Rounding forward (chest up)"
    ],
    "progression": "Increase box height. Add weight. Explosive Step-Up (drive knee up)."
  },
  {
    "id": "pistol-squat-assisted",
    "name": "Pistol Squat (Assisted)",
    "category": "Squat Pattern",
    "tier": "Advanced",
    "target": "Quads, glutes, balance, mobility",
    "equipment": "TRX band / doorway / pole for assistance",
    "setup": "Stand on one leg, other leg extended forward. Hold assistance with one hand.",
    "execution": "Descend slowly on the standing leg, extending the free leg forward. Keep the heel down. Use the assist only as needed. Drive through the heel to stand.",
    "breathing": "Inhale down, exhale up.",
    "commonMistakes": [
      "Losing balance (use more assist)",
      "Heel lifting (stretch ankle or use a wedge)"
    ],
    "progression": "Full unassisted Pistol Squat."
  },
  {
    "id": "dumbbell-deadlift",
    "name": "Dumbbell Deadlift",
    "category": "Hinge Pattern",
    "tier": "Beginner",
    "target": "Hamstrings, glutes, lower back",
    "equipment": "Dumbbells",
    "setup": "Feet hip-width. Dumbbells at mid-shin level. Hips back, back flat, chest up.",
    "execution": "Drive through the floor to stand. Hips and shoulders rise together. At the top, squeeze glutes. Return by pushing hips back.",
    "breathing": "Inhale at the bottom. Exhale at the top.",
    "commonMistakes": [
      "Rounding the lower back (cue \"proud chest\")",
      "Lifting with the lower back instead of legs (initiate with leg drive)"
    ],
    "progression": "Increase weight. Romanian Deadlift (RDL)."
  },
  {
    "id": "romanian-deadlift-rdl",
    "name": "Romanian Deadlift (RDL)",
    "category": "Hinge Pattern",
    "tier": "Intermediate",
    "target": "Hamstrings, glutes, lower back",
    "equipment": "Dumbbells or barbell",
    "setup": "Hold dumbbells in front of thighs. Slight bend in knees.",
    "execution": "Push hips back while keeping the bar/dumbbells close to the body. Lower until you feel a stretch in the hamstrings (mid-shin). Squeeze glutes to return.",
    "breathing": "Inhale on descent. Exhale on ascent.",
    "commonMistakes": [
      "Bending the knees too much (turns into a squat)",
      "Dumbbells drifting away from the body (drag them up your thighs)"
    ],
    "progression": "Single-Leg RDL. Deficit RDL."
  },
  {
    "id": "single-leg-romanian-deadlift",
    "name": "Single-Leg Romanian Deadlift",
    "category": "Hinge Pattern",
    "tier": "Advanced",
    "target": "Hamstrings, glutes, balance",
    "equipment": "Dumbbells (one or two)",
    "setup": "Stand on one leg, slight bend in the standing knee. Dumbbells in opposite hand (or both hands).",
    "execution": "Hinge at the hip, extending the free leg straight back. Keep the back flat. Lower the weight toward the floor. Drive through the standing heel to return.",
    "breathing": "Inhale down. Exhale up.",
    "commonMistakes": [
      "Rotating the hips open (keep hips square to the floor)",
      "Rounding the back too early (keep chest up as long as possible)"
    ],
    "progression": "Increase weight. Stand on a pad (unstable surface)."
  },
  {
    "id": "kettlebell-swing",
    "name": "Kettlebell Swing",
    "category": "Hinge Pattern",
    "tier": "Beginner–Intermediate",
    "target": "Glutes, hamstrings, core, cardio",
    "equipment": "Kettlebell",
    "setup": "Feet wider than hip-width. KB on floor in front. Hinge at hips, back flat. Grip the handle.",
    "execution": "Hike the KB between the legs. Snap the hips forward (not the arms) to swing the KB to chest height. Let the KB drop and hinge back. The arms are just ropes — all power comes from the hips.",
    "breathing": "Exhale on the snap. Inhale on the backswing.",
    "commonMistakes": [
      "Squatting the swing (it's a hinge, not a squat)",
      "Leading with the arms (hips drive)",
      "KB going above shoulder height (dangerous for shoulders)"
    ],
    "progression": "Heavy KB. Single-Arm Swing. Hand-to-Hand Swing."
  },
  {
    "id": "good-morning",
    "name": "Good Morning",
    "category": "Hinge Pattern",
    "tier": "Intermediate",
    "target": "Hamstrings, glutes, spinal erectors",
    "equipment": "Dumbbell or barbell",
    "setup": "Place a dumbbell across the back of the shoulders (or barbell). Feet hip-width, knees soft.",
    "execution": "Push hips back while maintaining a flat back. Torso leans forward until parallel to the floor (or hamstring stretch). Squeeze glutes to return.",
    "breathing": "Inhale on descent. Exhale on ascent.",
    "commonMistakes": [
      "Rounding the lower back",
      "Bending the knees too much"
    ],
    "progression": "Increase weight. Seated Good Morning."
  },
  {
    "id": "hip-thrust",
    "name": "Hip Thrust",
    "category": "Hinge Pattern",
    "tier": "Intermediate",
    "target": "Glutes",
    "equipment": "Bench, dumbbell/barbell (optional)",
    "setup": "Upper back resting on a bench. Feet flat on the floor, knees bent 90°. A dumbbell across the hips (optional).",
    "execution": "Drive through the heels to lift the hips until the body is straight from shoulders to knees. Squeeze glutes at the top for 1 second. Lower with control.",
    "breathing": "Exhale at the top. Inhale on descent.",
    "commonMistakes": [
      "Hyperextending the lower back (squeeze glutes, don't arch)",
      "Feet too close or too far"
    ],
    "progression": "Single-Leg Hip Thrust. Increasing weight."
  },
  {
    "id": "reverse-hyperextension-floor",
    "name": "Reverse Hyperextension (Floor)",
    "category": "Hinge Pattern",
    "tier": "Beginner–Intermediate",
    "target": "Glutes, lower back",
    "equipment": "Bench or mat",
    "setup": "Lie face down on a bench with hips at the edge and legs hanging off. Grip the bench.",
    "execution": "Squeeze glutes and hamstrings to lift the legs until they are parallel to the floor. Lower with control.",
    "breathing": "Exhale up. Inhale down.",
    "commonMistakes": [
      "Using momentum (control the descent)",
      "Arching the upper back (keep chest on the bench)"
    ],
    "progression": "Add ankle weights."
  },
  {
    "id": "band-glute-bridge",
    "name": "Band Glute Bridge",
    "category": "Hinge Pattern",
    "tier": "Beginner",
    "target": "Glutes",
    "equipment": "Resistance band",
    "setup": "Band just above the knees. Lie on back, knees bent, feet flat. Arms at sides.",
    "execution": "Press knees apart against the band (abduct). Drive through the heels to lift hips. Squeeze glutes at the top. Keep band tension throughout.",
    "breathing": "Exhale up. Inhale down.",
    "commonMistakes": [
      "Losing band tension",
      "Not squeezing glutes (lower back takes over)"
    ],
    "progression": "Single-Leg Glute Bridge. Weighted Bridge."
  },
  {
    "id": "incline-push-up",
    "name": "Incline Push-Up",
    "category": "Upper Body Push",
    "tier": "Beginner",
    "target": "Chest, shoulders, triceps",
    "equipment": "Bench, box, or wall",
    "setup": "Hands on an elevated surface (bench/box), wider than shoulder-width. Body in a straight line from head to heels.",
    "execution": "Lower chest toward the elevated surface. Elbows at 45° to the body. Push through the palms to return.",
    "breathing": "Inhale down. Exhale up.",
    "commonMistakes": [
      "Flaring elbows (keep 45°)",
      "Sagging hips (brace core)",
      "Piking hips up"
    ],
    "progression": "Lower the surface. Full Push-Up. Feet-Elevated Push-Up."
  },
  {
    "id": "full-push-up",
    "name": "Full Push-Up",
    "category": "Upper Body Push",
    "tier": "Intermediate",
    "target": "Chest, shoulders, triceps",
    "equipment": "None (mat optional)",
    "setup": "Hands on floor, slightly wider than shoulder-width. Body in a straight line from head to heels. Core braced.",
    "execution": "Lower chest to just above the floor. Elbows at 45°. Push through the palms to return.",
    "breathing": "Inhale down. Exhale up.",
    "commonMistakes": [
      "Sagging hips (cue \"squeeze glutes and brace abs\")",
      "Head dropping or looking up (neutral neck)",
      "Elbows wide (tuck to 45°)"
    ],
    "progression": "Decline Push-Up. Weighted Push-Up. Clapping Push-Up."
  },
  {
    "id": "deficit-push-up",
    "name": "Deficit Push-Up",
    "category": "Upper Body Push",
    "tier": "Advanced",
    "target": "Chest (full ROM), triceps",
    "equipment": "Two boxes/plates/handles",
    "setup": "Hands on elevated surfaces (e.g., dumbbells or blocks) at push-up width. Body straight.",
    "execution": "Lower chest below the hands (deficit = deeper stretch). Push through to full lockout.",
    "breathing": "Inhale down. Exhale up.",
    "commonMistakes": [
      "Loss of core tension (hips sag as you go deeper)",
      "Wrist pain (use push-up handles)"
    ],
    "progression": "Weight vest. Single-arm focus."
  },
  {
    "id": "dumbbell-bench-press",
    "name": "Dumbbell Bench Press",
    "category": "Upper Body Push",
    "tier": "Intermediate",
    "target": "Chest, shoulders, triceps",
    "equipment": "Dumbbells, bench",
    "setup": "Lie on a bench, dumbbells at shoulders, palms facing forward. Feet planted.",
    "execution": "Press the dumbbells up until arms are fully extended. Lower with control until elbows are below the bench (90°).",
    "breathing": "Inhale on descent. Exhale on ascent.",
    "commonMistakes": [
      "Dumbbells touching at the top (keeps tension off the chest — stop with a fist-width gap)",
      "Elbows flaring (tuck)"
    ],
    "progression": "Incline DB Press. Increase weight."
  },
  {
    "id": "incline-dumbbell-press",
    "name": "Incline Dumbbell Press",
    "category": "Upper Body Push",
    "tier": "Intermediate–Advanced",
    "target": "Upper chest, front delts, triceps",
    "equipment": "Dumbbells, adjustable bench",
    "setup": "Bench at 30–45°. Lie back, dumbbells at shoulders.",
    "execution": "Press up, bringing the dumbbells together slightly at the top (not touching). Lower with control.",
    "breathing": "Inhale down. Exhale up.",
    "commonMistakes": [
      "Bench angle too steep (>45° shifts load to shoulders)",
      "Dumbbells traveling behind the face at the bottom"
    ],
    "progression": "Increase weight. Dumbbell Floor Press."
  },
  {
    "id": "dumbbell-shoulder-press",
    "name": "Dumbbell Shoulder Press",
    "category": "Upper Body Push",
    "tier": "Intermediate",
    "target": "Shoulders (all 3 heads), triceps",
    "equipment": "Dumbbells",
    "setup": "Standing or seated. Dumbbells at shoulders, palms facing forward.",
    "execution": "Press dumbbells overhead until arms are fully extended. Lower to shoulders.",
    "breathing": "Exhale up. Inhale down.",
    "commonMistakes": [
      "Arching the lower back excessively (brace core)",
      "Dumbbells drifting in front of the face (they should go straight up and slightly back)"
    ],
    "progression": "Alternating Press. Arnold Press. Single-Arm Press."
  },
  {
    "id": "push-press",
    "name": "Push Press",
    "category": "Upper Body Push",
    "tier": "Advanced",
    "target": "Shoulders, triceps, explosive power",
    "equipment": "Dumbbells",
    "setup": "Dumbbells at shoulders. Slight bend in knees (quarter squat).",
    "execution": "Dip slightly and drive the legs to generate momentum to press the dumbbells overhead. The legs initiate the press — arms finish it.",
    "breathing": "Exhale on the press. Inhale on the return.",
    "commonMistakes": [
      "Not using the legs enough (it becomes a strict press)",
      "Dipping too deep (quarter squat only)"
    ],
    "progression": "Push Jerk (split stance catch)."
  },
  {
    "id": "triceps-pushdown-band",
    "name": "Triceps Pushdown (Band)",
    "category": "Upper Body Push",
    "tier": "Beginner–Intermediate",
    "target": "Triceps",
    "equipment": "Resistance band",
    "setup": "Anchor band overhead. Grip both ends. Elbows pinned to ribs.",
    "execution": "Push the band down until arms are fully extended. Return slowly against tension.",
    "breathing": "Exhale down. Inhale up.",
    "commonMistakes": [
      "Elbows flaring away from the body",
      "Using shoulders instead of triceps"
    ],
    "progression": "Cable Pushdown. Overhead Triceps Extension."
  },
  {
    "id": "band-row",
    "name": "Band Row",
    "category": "Upper Body Pull",
    "tier": "Beginner",
    "target": "Mid-back, lats, biceps",
    "equipment": "Resistance band",
    "setup": "Step on the band. Feet hip-width. Hinge at hips so torso is ~45°. Grip band with both hands.",
    "execution": "Pull the band toward the lower ribs. Squeeze the shoulder blades together at the top. Extend arms back under control.",
    "breathing": "Exhale on the pull. Inhale on the release.",
    "commonMistakes": [
      "Using the lower back to rock the weight (keep torso still)",
      "Shrugging up to the ears (depress shoulder blades)"
    ],
    "progression": "Double the band. Dumbbell Row."
  },
  {
    "id": "dumbbell-row-bent-over",
    "name": "Dumbbell Row (Bent-Over)",
    "category": "Upper Body Pull",
    "tier": "Intermediate",
    "target": "Lats, mid-back, biceps",
    "equipment": "Dumbbell, bench",
    "setup": "Place one knee and hand on a bench. The foot of the other leg is planted. Hold a dumbbell with the free hand, arm extended. Back flat.",
    "execution": "Pull the dumbbell toward the hip/waist. Squeeze the lat at the top. Lower with control.",
    "breathing": "Exhale on the pull. Inhale on the lower.",
    "commonMistakes": [
      "Twisting the torso (keep hips and shoulders square)",
      "Rounding the back (chin tucked, chest open)",
      "Using too much biceps (lead with the elbow, not the hand)"
    ],
    "progression": "Increase weight. Two-Arm Row. Pendlay Row."
  },
  {
    "id": "renegade-row",
    "name": "Renegade Row",
    "category": "Upper Body Pull",
    "tier": "Advanced",
    "target": "Lats, core, shoulders",
    "equipment": "Dumbbells",
    "setup": "Start in a push-up position, each hand gripping a dumbbell. Feet wide for stability. Core braced.",
    "execution": "Row one dumbbell toward the hip, keeping the hips square. Lower it and repeat on the other side.",
    "breathing": "Breathe steadily. Exhale on the row.",
    "commonMistakes": [
      "Hips rotating open (they should stay parallel to the floor)",
      "Dumbbell not coming high enough (pull to the hip, not the chest)"
    ],
    "progression": "Push-Up + Row (one rep each). Add weight. Knee push-up variation."
  },
  {
    "id": "pull-up-assisted",
    "name": "Pull-Up (Assisted)",
    "category": "Upper Body Pull",
    "tier": "Intermediate",
    "target": "Lats, biceps, upper back",
    "equipment": "Pull-up bar, resistance band",
    "setup": "Grip the bar wider than shoulder-width (pronated). Hang with arms fully extended. Loop a band under a foot for assistance.",
    "execution": "Pull the chest toward the bar. Lead with the elbows. Lower under control.",
    "breathing": "Exhale on the pull. Inhale on the lower.",
    "commonMistakes": [
      "Kipping (keep the body still — strict only)",
      "Not reaching full extension at the bottom",
      "Chin not clearing the bar (full ROM)"
    ],
    "progression": "Lighter band. Negative Pull-Ups. Unassisted Pull-Up. Weighted Pull-Up."
  },
  {
    "id": "chin-up",
    "name": "Chin-Up",
    "category": "Upper Body Pull",
    "tier": "Intermediate–Advanced",
    "target": "Biceps, lats",
    "equipment": "Pull-up bar",
    "setup": "Grip the bar with palms facing you (supinated), shoulder-width.",
    "execution": "Pull the chest toward the bar. Elbows come forward and down. Lower with control.",
    "breathing": "Exhale on the pull. Inhale on the lower.",
    "commonMistakes": [
      "Same as pull-ups — keep strict form, no kipping"
    ],
    "progression": "Weighted Chin-Up. Archer Chin-Up."
  },
  {
    "id": "trx-band-inverted-row",
    "name": "TRX / Band Inverted Row",
    "category": "Upper Body Pull",
    "tier": "Beginner–Intermediate",
    "target": "Mid-back, lats, biceps",
    "equipment": "TRX suspension trainer or bar in a rack",
    "setup": "Grip the handles/bar, walk feet forward so body is at 45–60° angle. Body straight.",
    "execution": "Pull the chest toward the handles. Squeeze shoulder blades together. Lower with control.",
    "breathing": "Exhale on the pull. Inhale on the lower.",
    "commonMistakes": [
      "Sagging hips (brace core)",
      "Elbows wide (tuck to 45°)",
      "Not pulling to the chest"
    ],
    "progression": "Walk feet forward (more horizontal = harder). Add weight vest."
  },
  {
    "id": "face-pull-band",
    "name": "Face Pull (Band)",
    "category": "Upper Body Pull",
    "tier": "Beginner–Intermediate",
    "target": "Rear delts, upper back, rotator cuff",
    "equipment": "Resistance band",
    "setup": "Anchor the band at chest height. Grip with both hands. Step back to create tension.",
    "execution": "Pull the band toward the face, elbows wide and high. Squeeze the rear delts at the peak. Return slowly.",
    "breathing": "Exhale on the pull. Inhale on the release.",
    "commonMistakes": [
      "Pulling to the chin (should be to the forehead/face level)",
      "Using too heavy a band (lose control)"
    ],
    "progression": "Cable Face Pull. Band Pull-Apart."
  },
  {
    "id": "plank",
    "name": "Plank",
    "category": "Core / Anti-Rotation",
    "tier": "Beginner",
    "target": "Core (transverse abdominis), shoulders",
    "equipment": "Mat",
    "setup": "Forearms on the floor, elbows under shoulders. Body in a straight line from head to heels.",
    "execution": "Brace the core as if expecting a punch. Hold. Breathe steadily.",
    "breathing": "Steady breaths throughout — do not hold.",
    "commonMistakes": [
      "Hips sagging (squeeze glutes)",
      "Hips piking up (drop hips toward the floor)",
      "Looking forward (neutral neck)"
    ],
    "progression": "Extended Plank (arms). Shoulder Taps. Plank with Leg Lift."
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "category": "Core / Anti-Rotation",
    "tier": "Beginner–Intermediate",
    "target": "Deep core, coordination",
    "equipment": "Mat",
    "setup": "Lie on back, arms extended toward the ceiling, legs in a 90° tabletop.",
    "execution": "Simultaneously extend the right arm overhead and left leg toward the floor. Pause. Return. Alternate. Lower back stays glued to the floor.",
    "breathing": "Exhale as you extend. Inhale as you return.",
    "commonMistakes": [
      "Lower back arching (press it into the floor — if it arches, reduce ROM)",
      "Moving too fast (control is everything)"
    ],
    "progression": "Add weight (hold a dumbbell in the overhead arm). Band resistance."
  },
  {
    "id": "bicycle-crunch",
    "name": "Bicycle Crunch",
    "category": "Core / Anti-Rotation",
    "tier": "Intermediate",
    "target": "Obliques, rectus abdominis",
    "equipment": "Mat",
    "setup": "Lie on back, hands behind the head (lightly). Legs in tabletop.",
    "execution": "Bring the right elbow toward the left knee as the left leg extends. Alternate sides in a pedaling motion.",
    "breathing": "Exhale on each twist.",
    "commonMistakes": [
      "Pulling the head (hands are pillows — light touch)",
      "Moving too fast (quality over speed)",
      "Feet not extending far enough"
    ],
    "progression": "Slower tempo. Weighted Bicycle (light DB)."
  },
  {
    "id": "side-plank",
    "name": "Side Plank",
    "category": "Core / Anti-Rotation",
    "tier": "Intermediate",
    "target": "Obliques, gluteus medius",
    "equipment": "Mat",
    "setup": "Lie on one side, elbow under shoulder, legs stacked. Lift hips so body forms a straight line.",
    "execution": "Hold the position. Hips don't sag.",
    "breathing": "Breathe steadily.",
    "commonMistakes": [
      "Hips sagging (lift them higher)",
      "Head dropping (align with spine)",
      "Top hip rotating forward (keep stacked)"
    ],
    "progression": "Side Plank with Leg Lift. Side Plank Hip Dips. Rotating Side Plank."
  },
  {
    "id": "plank-jacks",
    "name": "Plank Jacks",
    "category": "Core / Anti-Rotation",
    "tier": "Intermediate",
    "target": "Core, hip adductors, shoulders",
    "equipment": "Mat",
    "setup": "Start in a full plank (arms extended) or forearm plank.",
    "execution": "Hop the feet wide (like a jumping jack), then hop them back together. Keep hips stable — no sagging or bouncing.",
    "breathing": "Breathe steadily through each rep.",
    "commonMistakes": [
      "Hips sagging as feet go wide (tighten core)",
      "Bouncing the hips"
    ],
    "progression": "Increase speed. Add a push-up before the jack."
  },
  {
    "id": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "category": "Core / Anti-Rotation",
    "tier": "Advanced",
    "target": "Lower abs, hip flexors",
    "equipment": "Pull-up bar",
    "setup": "Hang from a pull-up bar, arms fully extended.",
    "execution": "Raise the knees toward the chest without swinging. Lower under control.",
    "breathing": "Exhale up. Inhale down.",
    "commonMistakes": [
      "Swinging the body (controlled tempo only)",
      "Using momentum (if you rock, pause and restart)"
    ],
    "progression": "Toes-to-Bar. Weighted Knee Raise. Hanging Leg Raise (straight legs)."
  },
  {
    "id": "russian-twist",
    "name": "Russian Twist",
    "category": "Core / Anti-Rotation",
    "tier": "Intermediate",
    "target": "Obliques",
    "equipment": "Dumbbell or med ball (optional)",
    "setup": "Sit with knees bent, feet off the floor (advanced) or on the floor (beginner). Hold a weight at the chest.",
    "execution": "Rotate the torso to one side, then the other. The weight moves beside the hip.",
    "breathing": "Exhale on each twist.",
    "commonMistakes": [
      "Twisting the spine (rotate from the ribcage, not the lower back)",
      "Feet dropping to floor (keep them steady)"
    ],
    "progression": "Add weight. Feet elevated. Slower tempo with pause."
  },
  {
    "id": "hollow-body-hold",
    "name": "Hollow Body Hold",
    "category": "Core / Anti-Rotation",
    "tier": "Intermediate",
    "target": "Full core, hip flexors",
    "equipment": "Mat",
    "setup": "Lie on back, arms extended overhead, legs straight.",
    "execution": "Press the lower back into the floor. Lift the shoulders and legs a few inches off the floor. Body forms a \"banana\" shape. Hold.",
    "breathing": "Breathe steadily — do not hold breath.",
    "commonMistakes": [
      "Lower back lifting (press it down HARD)",
      "Head tilted back (chin tucked)",
      "Arms sagging (reach past the head)"
    ],
    "progression": "Extend legs further. Hold longer. Rocking Hollow Hold."
  },
  {
    "id": "dumbbell-thruster",
    "name": "Dumbbell Thruster",
    "category": "Full Body / Power",
    "tier": "Intermediate",
    "target": "Quads, glutes, shoulders — total body",
    "equipment": "Dumbbells",
    "setup": "Dumbbells at shoulders. Feet shoulder-width.",
    "execution": "Squat to parallel. Explode up, using the momentum to press the dumbbells overhead. One fluid motion — squat + press = 1 rep.",
    "breathing": "Inhale down. Exhale on the press.",
    "commonMistakes": [
      "Pressing before standing (sequencing is wrong)",
      "Squatting shallow"
    ],
    "progression": "Barbell Thruster. Heavier DB."
  },
  {
    "id": "dumbbell-clean",
    "name": "Dumbbell Clean",
    "category": "Full Body / Power",
    "tier": "Intermediate–Advanced",
    "target": "Full body — hamstrings, glutes, shoulders",
    "equipment": "Dumbbells",
    "setup": "Dumbbells on the floor between feet. Hinge down, back flat.",
    "execution": "Explosively extend the hips and knees to pull the dumbbells to shoulder height. \"Catch\" them in a front rack position (elbows high).",
    "breathing": "Exhale on the pull. Inhale in the rack.",
    "commonMistakes": [
      "Pulling with the arms only (drive with legs)",
      "Catching the bell on the shoulder hard (absorb it)"
    ],
    "progression": "Dumbbell Snatch. Barbell Power Clean."
  },
  {
    "id": "dumbbell-snatch",
    "name": "Dumbbell Snatch",
    "category": "Full Body / Power",
    "tier": "Advanced",
    "target": "Full body — explosive power, shoulders",
    "equipment": "Dumbbell",
    "setup": "One dumbbell on the floor between feet. Hinge down, one hand gripping it.",
    "execution": "Explosively extend the hips to pull the dumbbell overhead in one motion. The arm goes straight up — don't \"press\" it.",
    "breathing": "Exhale on the pull.",
    "commonMistakes": [
      "Pressing the weight instead of punching through",
      "Squatting the catch"
    ],
    "progression": "Two-Dumbbell Snatch. Barbell Snatch."
  },
  {
    "id": "burpee",
    "name": "Burpee",
    "category": "Full Body / Power",
    "tier": "Beginner–Intermediate",
    "target": "Full body, cardio",
    "equipment": "None",
    "setup": "Standing tall.",
    "execution": "Drop to a squat. Place hands on the floor. Jump/step feet back into a plank. Perform a push-up (full or half). Jump/step feet back to hands. Stand up and jump.",
    "breathing": "Exhale at the jump. Keep breathing through the movement.",
    "commonMistakes": [
      "Skipping the push-up (maintain full ROM)",
      "Sagging core in plank",
      "Lazy jump (explosive finish)"
    ],
    "progression": "Burpee with Tuck Jump. Burpee Box Jump Over. Weight Vest."
  },
  {
    "id": "burpee-box-jump-over",
    "name": "Burpee Box Jump Over",
    "category": "Full Body / Power",
    "tier": "Advanced",
    "target": "Full body, plyometric power",
    "equipment": "Box (24\"/20\")",
    "setup": "Stand facing the box.",
    "execution": "Drop into burpee. At the finish of the burpee, immediately jump vertically and land on the box, then step down. Or jump over the box in one fluid motion.",
    "breathing": "Keep breathing — don't hold.",
    "commonMistakes": [
      "Hesitating between burpee and jump (make it one fluid combo)",
      "Jumping too short (use a lower box)"
    ],
    "progression": "Add a push-up. Increase box height."
  },
  {
    "id": "bear-crawl",
    "name": "Bear Crawl",
    "category": "Full Body / Power",
    "tier": "Intermediate",
    "target": "Full body, coordination, core",
    "equipment": "Mat (optional)",
    "setup": "On hands and knees. Knees hover 2\" off the floor.",
    "execution": "Crawl forward: right hand + left foot, then left hand + right foot. Keep knees hovering. Control the movement.",
    "breathing": "Breathe rhythmically — exhale on each step.",
    "commonMistakes": [
      "Knees dragging on the floor (keep them up)",
      "Moving the same side hand + foot (opposite side always)"
    ],
    "progression": "Backward Crawl. Weighted Crawl. Lateral Crawl."
  },
  {
    "id": "mountain-climbers",
    "name": "Mountain Climbers",
    "category": "Cardio / Conditioning",
    "tier": "Beginner–Intermediate",
    "target": "Cardio, hip flexors, core",
    "equipment": "Mat",
    "setup": "Start in a full plank (arms extended).",
    "execution": "Drive one knee toward the chest, then alternate quickly. Maintain a stable plank throughout — no hip bouncing.",
    "breathing": "Breathe rhythmically — 2–3 breaths per cycle.",
    "commonMistakes": [
      "Hips sagging (core loose)",
      "Feet slapping the floor (quiet, controlled steps)"
    ],
    "progression": "Slow Mountain Climber (tempo). Cross-Body Mountain Climber. Feet-Elevated."
  },
  {
    "id": "high-knees",
    "name": "High Knees",
    "category": "Cardio / Conditioning",
    "tier": "Beginner–Intermediate",
    "target": "Cardio, hip flexors",
    "equipment": "None",
    "setup": "Standing tall.",
    "execution": "Drive one knee up to waist height, then quickly alternate. Pump arms at the same time. Land softly on the balls of the feet.",
    "breathing": "Breathe rhythmically — don't hold.",
    "commonMistakes": [
      "Leaning backward (stay tall)",
      "Landing heavy (soft feet)",
      "Knees not reaching waist height"
    ],
    "progression": "A-Skip. High Knees with resistance band at ankles."
  },
  {
    "id": "battle-ropes-slams",
    "name": "Battle Ropes (Slams)",
    "category": "Cardio / Conditioning",
    "tier": "Intermediate",
    "target": "Cardio, shoulders, grip",
    "equipment": "Battle ropes",
    "setup": "Hold one end of the rope in each hand. Feet shoulder-width, slight squat stance.",
    "execution": "Slam both arms down to create a wave. Alternate waves, double slams, or circles.",
    "breathing": "Exhale on each slam. Breathe deeply.",
    "commonMistakes": [
      "Too much arm (use the whole body)",
      "Standing too upright (athletic stance)"
    ],
    "progression": "Alternating waves. Circles. Side slams."
  },
  {
    "id": "box-jumps",
    "name": "Box Jumps",
    "category": "Cardio / Conditioning",
    "tier": "Intermediate–Advanced",
    "target": "Explosive power, quads, glutes",
    "equipment": "Box (12–24\")",
    "setup": "Stand facing the box at arm's length distance.",
    "execution": "Dip the hips (quarter squat), swing arms back, then explode up and forward. Land softly on the box — don't stomp. Stand tall, step down (never jump down).",
    "breathing": "Exhale on the jump.",
    "commonMistakes": [
      "Jumping too early (set the jump)",
      "Stomping the landing (absorb the landing quietly)",
      "Stepping back off the box instead of stepping down"
    ],
    "progression": "Higher box. Single-Leg Box Jump. Box Jump Over."
  },
  {
    "id": "skater-hops",
    "name": "Skater Hops",
    "category": "Cardio / Conditioning",
    "tier": "Intermediate",
    "target": "Lateral power, glutes, quads",
    "equipment": "None (mat optional)",
    "setup": "Stand on one leg.",
    "execution": "Hop laterally to the other leg, landing softly. The free leg reaches behind the standing leg. Hop back immediately.",
    "breathing": "Breathe rhythmically.",
    "commonMistakes": [
      "No arm swing (use arms for momentum)",
      "Hard landings (absorb through the knee and hip)"
    ],
    "progression": "Increase distance. Speed Skaters (bigger hops). Single direction."
  },
  {
    "id": "jump-rope-basic",
    "name": "Jump Rope (Basic)",
    "category": "Cardio / Conditioning",
    "tier": "Beginner–Intermediate",
    "target": "Cardio, coordination, calves",
    "equipment": "Jump rope",
    "setup": "Hold handles at hip height. Rope behind you.",
    "execution": "Swing the rope overhead and jump as it passes under your feet. Land softly on the balls of your feet. Minimal jumping height — just enough to clear the rope.",
    "breathing": "Breathe rhythmically.",
    "commonMistakes": [
      "Jumping too high (waste of energy)",
      "Flaring elbows (keep them close)",
      "Looking at feet (look forward)"
    ],
    "progression": "Double Under (rope passes twice per jump). Single-Leg Jumps. Running in Place."
  },
  {
    "id": "marching-high-step",
    "name": "Marching (High-Step)",
    "category": "Cardio / Conditioning",
    "tier": "Beginner",
    "target": "Cardio (low impact), hip flexors",
    "equipment": "None",
    "setup": "Standing tall.",
    "execution": "Lift one knee to waist height, then lower and lift the other. Pump the opposite arm. Keep the torso upright.",
    "breathing": "Breathe steadily.",
    "commonMistakes": [
      "Leaning backward",
      "Lifting the knee with momentum (controlled)"
    ],
    "progression": "Faster pace. Weighted Marching (ankle weights). Marching with high arms."
  }
];
