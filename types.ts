export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  snake: Point[];
  food: Point;
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  highScore: number;
  victory: boolean;
}