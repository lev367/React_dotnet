import { useRestApi } from "../../hooks/useRestApi";
import type { ProductDto } from "../../Types";
import { ProductList } from "./ProductList";

export function Products() {
  const { items } = useRestApi<ProductDto>("/products");

  return <ProductList products={items ?? []} />;
}
