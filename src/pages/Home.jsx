import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import FeaturedPlaces from "../components/WelcomeSection/FeaturedPlaces";
import CategorySection from "../components/WelcomeSection/CategorySection";
import HueIntroSection from "../components/WelcomeSection/HueIntroSection";
import Footer from "../components/Footer/Footer";

const Home = () =>{
    return(
        <div>
            <Header/>
            <WelcomeSection/>
            <FeaturedPlaces/>
            <HueIntroSection/>
            <CategorySection/>
            <Footer/>
        </div>
    );
}

export default Home