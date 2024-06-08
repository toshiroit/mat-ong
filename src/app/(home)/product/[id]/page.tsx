import { Product } from "../../components/product";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-9">
      <div>
        <Product id={params.id} />
      </div>
    </div>
  );
}
