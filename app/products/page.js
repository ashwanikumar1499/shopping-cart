import NavigationBar from "@/components/nav-bar";
import ProductCard from "@/components/product-card";

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Products() {
  const products = await fetchProducts();

  console.log(products);
  return (
    <div className="p-5">
      <NavigationBar />
      <div className="grid grid-cols-3 gap-y-5 gap-x-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
