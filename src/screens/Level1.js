import LevelScreen from './LevelScreen';
import { level1Slides } from '../data/story';
import { getLevel1Questions } from '../data/questions';
import { useMemo } from 'react';

export default function Level1() {
  const questions = useMemo(() => getLevel1Questions(), []);
  return (
    <LevelScreen
      levelNum={1}
      levelTitle="What is Money?"
      levelIcon="💸"
      levelColor="accent"
      slides={level1Slides}
      questions={questions}
      badgeName="Money Mindset"
      badgeIcon="💸"
      xpReward={150}
      nextLevelRoute="/level/2"
    />
  );
}
