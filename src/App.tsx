import { Layout } from "@/components/Layout";
import { AssetDetailPage } from "@/pages/AssetDetailPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { DocPage } from "@/pages/DocPage";
import { RepositoryPage } from "@/pages/RepositoryPage";
import { SpecificationPage } from "@/pages/SpecificationPage";
import { SubmitPage } from "@/pages/SubmitPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/assets/:id" element={<AssetDetailPage />} />
        <Route path="/repository" element={<RepositoryPage />} />
        <Route path="/specification" element={<SpecificationPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/docs/:slug" element={<DocPage />} />
      </Route>
    </Routes>
  );
}
