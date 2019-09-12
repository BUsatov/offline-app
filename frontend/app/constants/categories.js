import LocalDiningIcon from "@material-ui/icons/LocalDining";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import BuildIcon from "@material-ui/icons/Build";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PaletteSharpIcon from "@material-ui/icons/PaletteSharp";
import PetsSharpIcon from "@material-ui/icons/PetsSharp";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";

const CATEGORIES = {
  cooking: { icon: LocalDiningIcon, label: "cooking" },
  handcrafting: { icon: PanToolSharpIcon, label: "handcrafting" },
  sport: { icon: DirectionsRunIcon, label: "fitness & sports" },
  wellness: { icon: WbSunnyIcon, label: "wellness & beauty" },
  gardening: { icon: LocalFloristIcon, label: "gardening" },
  fixing: { icon: BuildIcon, label: "fixing" },
  arts: { icon: PaletteSharpIcon, label: "arts" },
  parenting: { icon: PetsSharpIcon, label: "parenting" }
};
export default CATEGORIES;
