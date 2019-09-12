import LocalDiningIcon from "@material-ui/icons/LocalDining";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import BuildIcon from "@material-ui/icons/Build";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import BrushIcon from "@material-ui/icons/Brush";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const CATEGORIES = {
  cooking: { icon: LocalDiningIcon, label: "cooking" },
  handcrafting: { icon: BuildIcon, label: "handcrafting" },
  sport: { icon: DirectionsRunIcon, label: "fitness & sports" },
  wellness: { icon: WbSunnyIcon, label: "wellness & beauty" },
  gardening: { icon: LocalFloristIcon, label: "gardening" },
  fixing: { icon: BuildIcon, label: "fixing" },
  arts: { icon: BrushIcon, label: "arts" },
  parenting: { icon: ChildFriendlyIcon, label: "parenting" }
};
export default CATEGORIES;
