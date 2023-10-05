import Search from "~/components/Search";
import Title from "~/components/Title";

export default function Bookmarks() {
  return (
    <div>
      <Search />
      <Title text="Bookmarked Movies" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8"></div>
      <Title text="Bookmarked TV Series" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8"></div>
    </div>
  );
}
