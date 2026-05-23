import { Icon as OfflineIcon, addCollection } from '@iconify/react/dist/offline';
import carbon from '../data/iconify/carbon.json';
import devicon from '../data/iconify/devicon.json';
import fluent from '../data/iconify/fluent.json';
import logos from '../data/iconify/logos.json';
import mdi from '../data/iconify/mdi.json';
import ph from '../data/iconify/ph.json';
import simpleIcons from '../data/iconify/simple-icons.json';
import skillIcons from '../data/iconify/skill-icons.json';

let collectionsRegistered = false;

function registerCollections() {
  if (collectionsRegistered) {
    return;
  }

  [carbon, devicon, fluent, logos, mdi, ph, simpleIcons, skillIcons].forEach((collection) => {
    addCollection(collection);
  });

  collectionsRegistered = true;
}

registerCollections();

export function Icon(props) {
  return <OfflineIcon {...props} />;
}
