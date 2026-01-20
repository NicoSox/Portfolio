import Header from '../components/Header';
import Footer from '../components/Footer';
import Portfolio from './Portfolio';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
export default Home;