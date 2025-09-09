import React from "react";
import Header from "../../components/Header/Header";
import "virtual:svg-icons-register";
import Lastproducts from "../../components/lastProducts/Lastproducts";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import AboutUs from "../../components/AboutUs/AboutUs";
import Blogs from "../../components/Blogs/Blogs";
import ContactUs from "../../components/ContactUs/ContactUs";
import Footer from "../../components/Footer/Footer";
import RoadMap from "../../components/RoadMap/RoadMap";



function Index() {
 

  return (
    <div >
      <div className="bg-gray-100 dark:bg-zinc-800">
        <Header />
        <Lastproducts />
        <AboutUs />
        <PopularProducts />
        <RoadMap />
        <Blogs />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
}

export default Index;
