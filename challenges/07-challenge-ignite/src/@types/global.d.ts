interface ContentProps {
  selectedGenreId: number
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface SideBarProps {
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

interface IconProps {
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  color: string;
}

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}