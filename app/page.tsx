import dynamic from "next/dynamic";
import { BreakingBar } from "@/components/sections/BreakingBar";
import { getAllArticles, getEditorsPicks, getFeaturedArticles, getLatestArticles, getPhotoStories, getTrendingArticles } from "@/services/articles";

const HeroGallery = dynamic(() => import("@/components/hero/HeroGallery"));
const LatestGrid = dynamic(() => import("@/components/sections/LatestGrid"));
const TrendingFlip = dynamic(() => import("@/components/sections/TrendingFlip"));
const EditorsStack = dynamic(() => import("@/components/sections/EditorsStack"));
const CategoryLanes = dynamic(() => import("@/components/sections/CategoryLanes"));
const PhotoCube = dynamic(() => import("@/components/sections/PhotoCube"));
const LiveBoard = dynamic(() => import("@/components/sections/LiveBoard"));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"));

export default async function HomePage() {
  const [featured, latest, trending, picks, photos, all] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(),
    getTrendingArticles(),
    getEditorsPicks(),
    getPhotoStories(),
    getAllArticles(),
  ]);

  return (
    <>
      <HeroGallery articles={featured} />
      <BreakingBar />
      <LatestGrid articles={latest} />
      <TrendingFlip articles={trending} />
      <EditorsStack articles={picks} />
      <CategoryLanes articles={all} />
      <PhotoCube articles={photos} />
      <LiveBoard />
      <Newsletter />
    </>
  );
}
