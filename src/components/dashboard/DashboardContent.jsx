import DashboardHeader from "./DashboardHeader";
import Hero from "./Hero";
import OutfitCards from "./OutfitCards";
import SectionHead from "./SectionHead";
import StatCards from "./StatCards";


const DashboardContent = () => {

    return(
        <main className="content">
            <DashboardHeader/>
            <section className="hero">
                <Hero />
            </section>
            <StatCards/>
            <SectionHead/>
            <OutfitCards/>
        </main>
    )

}

export default DashboardContent;