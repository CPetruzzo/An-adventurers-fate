import { LoaderScene } from './scenes/LoaderScene';
import { SceneManager } from './utils/SceneManager';

SceneManager.initialize();

SceneManager.changeScene(new LoaderScene());