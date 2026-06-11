import LevelScreen from './LevelScreen';
import { level2Slides } from '../data/story';
import { getLevel2Questions } from '../data/questions';
import { useMemo } from 'react';

export default function Level2() {
  const questions = useMemo(() => getLevel2Questions(), []);
  return (
    <LevelScreen
      levelNum={2}
      levelTitle="How Bitcoin Works"
      levelIcon="⛓️"
      levelColor="blue"
      slides={level2Slides}
      questions={questions}
      badgeName="Chain Builder"
      badgeIcon="⛓️"
      xpReward={200}
      nextLevelRoute="/level/3"
    />
  );
}
