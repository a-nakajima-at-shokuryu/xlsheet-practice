import logo from './logo.svg';
import './App.css';
import Sheet from './components/Sheet';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Sheet />
      </div>
    </RecoilRoot>
  );
}

export default App;
