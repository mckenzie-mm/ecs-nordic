import { IProductDTO } from '../DTO/productDTO';
import Card from './card';

export default function Products({ products } : {
    products: Array<IProductDTO>;
}) {
    return (
        <section className="section">
            <div className="grid-products">
                {products.map((product, index) => 
                    <Card productDTO={product} key={index} />)
                }
            </div>
        </section>
    );
  }