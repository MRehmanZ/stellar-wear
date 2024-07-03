import './App.css';
import NavBar from './components/NavBar';
import Heroes from './components/Heroes';

function App() {
  return (
    <>
      <NavBar />
      <Heroes
        title="Collection"
        subtitle="blah blah"
        imageUrl='/Hero.jpg'        
        linkUrl="/shop-now"
      />

    </>
  );
}

export default App;
