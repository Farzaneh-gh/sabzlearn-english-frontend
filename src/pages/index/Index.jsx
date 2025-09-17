import React from "react";
import Header from "../../components/Layout/Header/Header";
import "virtual:svg-icons-register";
import Lastproducts from "../../components/course/lastProducts/Lastproducts";
import PopularProducts from "../../components/course/PopularProducts/PopularProducts";
import AboutUs from "../../components/page-specific/AboutUs/AboutUs";
import Blogs from "../../components/article/Blogs/Blogs";
import ContactUs from "../../components/page-specific/ContactUs/ContactUs";
import Footer from "../../components/Layout/Footer/Footer";
import RoadMap from "../../components/page-specific/RoadMap/RoadMap";



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
