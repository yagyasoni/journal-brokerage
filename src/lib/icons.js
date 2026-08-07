import {
  Check,
  CheckCircle2,
  Clock,
  Crosshair,
  FileText,
  Landmark,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";

/**
 * Data files carry icon *names* (they stay serialisable and `@ts-check`-able);
 * components resolve them through this map.
 */
export const icons = {
  Check,
  CheckCircle2,
  Clock,
  Crosshair,
  FileText,
  Landmark,
  Plus,
  Search,
  ShieldCheck,
};

export function getIcon(name) {
  return icons[name] ?? Search;
}
