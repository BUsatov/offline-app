import React from "react";
import PetsIcon from "app/icons/pets.svg";
import CookingIcon from "app/icons/cooking.svg";
import HandcraftingIcon from "app/icons/handcrafting.svg";
import SportsIcon from "app/icons/sport.svg";
import WellnessIcon from "app/icons/wellness.svg";
import GardeningIcon from "app/icons/gardening.svg";
import FixingIcon from "app/icons/fixing.svg";
import ArtsIcon from "app/icons/arts.svg";

const CATEGORIES = {
  cooking: { icon: <CookingIcon />, label: "cooking" },
  handcrafting: { icon: <HandcraftingIcon />, label: "handcrafting" },
  sport: { icon: <SportsIcon />, label: "fitness & sports" },
  wellness: { icon: <WellnessIcon />, label: "wellness & beauty" },
  gardening: { icon: <GardeningIcon />, label: "gardening" },
  fixing: { icon: <FixingIcon />, label: "fixing" },
  arts: { icon: <ArtsIcon />, label: "arts" },
  parenting: { icon: <PetsIcon />, label: "pets" }
};
export default CATEGORIES;
