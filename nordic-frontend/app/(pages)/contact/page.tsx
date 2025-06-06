
const { 
    CONTACT_IMG, 
    CONTACT_TITLE, 
    CONTACT_ADDRESS_CAPTION, 
    ADDRESS, 
    OPEN_HOURS, 
    MAP_CAPTION, 
    MAP_IMG 
} = require("@/app/templates");

export default function Contact() {
    return (
        <div className="contact">
            <section className="section">
                <div className="contact-title">
                    <h1>{CONTACT_TITLE}</h1>
                </div>
            </section>
            <section className="section">
                <div className="contact-container">
                    <div className="image-wrap"> 
                        <img className="image" src={CONTACT_IMG} alt="contact image" />
                    </div> 
                </div>
            </section>
            <section className="section">
                <div className="contact-grid">
                    <h2 className="contact-caption">{CONTACT_ADDRESS_CAPTION}</h2>
                    <div className="contact-text">
                        {
                            ADDRESS.map((src: string, index: number) => <p key={index}>{src}</p>)
                        }
                        <br/>
                        {
                            OPEN_HOURS.map((src: string, index: number) => <p key={index}>{src}</p>)
                        }
                        <br/>
                     </div>
                    <h2 className="contact-caption">{MAP_CAPTION}</h2>
                    <div className="map-container">  
                        <div className="map-img-wrap"> 
                            <img className="map-img" src={MAP_IMG} alt="map image" />
                        </div> 
                    </div> 
                </div>
            </section>
        </div>
    );
}
    
  