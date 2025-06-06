
const { 
    SHIPPING_IMG, 
    SHIPPING_TITLE, 
    DELIVERY_CAPTION, 
    PAYMENT_CAPTION, 
    EXCHANGE_CAPTION,
    DELIVERY,
    PAYMENT,
    EXCHANGE
} = require( "@/app/templates");

export default function Shipping() {
    return (
        <div className="shipping">
            <section className="section">
                <div className="shipping-title">
                    <h1>{SHIPPING_TITLE}</h1>
                </div>
            </section>
            <section className="section">
                <div className="shipping-container">
                    <div className="image-wrap"> 
                        <img className="image" src={SHIPPING_IMG} alt="shipping image" />
                    </div> 
                </div>
            </section>
            <section className="section">
                <div className="shipping-grid">
                    <h2 className="shipping-caption">{DELIVERY_CAPTION}</h2>
                    <div className="shipping-text">
                    {
                        DELIVERY.map((src: string, index: number) => <p key={index}>{src}</p>)
                    }
                    </div> 
                    <h2 className="shipping-caption">{PAYMENT_CAPTION}</h2>
                    <div className="shipping-text">
                    {
                        PAYMENT.map((src: string, index: number) => <p key={index}>{src}</p>)
                    }
                    </div>
                    <h2 className="shipping-caption">{EXCHANGE_CAPTION}</h2>
                    <div className="shipping-text">
                    {
                        EXCHANGE.map((src: string, index: number) => <p key={index}>{src}</p>)
                    }
                    </div>
                </div>
            </section>
        </div>
    );
}
    