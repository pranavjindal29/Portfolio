import { Icon as OfflineIcon, addCollection, addIcon } from '@iconify/react/dist/offline';
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

  addIcon('custom:bash', {
    body: '<path fill="currentColor" d="M36 58a6 6 0 0 1 6-6h172a6 6 0 0 1 6 6v140a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6zm16.5 26.5a5 5 0 0 0 0 7.07L72.93 112L52.5 132.43a5 5 0 1 0 7.07 7.07l24-24a5 5 0 0 0 0-7.07l-24-24a5 5 0 0 0-7.07 0M98 143a5 5 0 0 0 5 5h48a5 5 0 0 0 0-10h-48a5 5 0 0 0-5 5"/>',
    width: 256,
    height: 256,
  });

  collectionsRegistered = true;
}

registerCollections();

export function Icon(props) {
  return <OfflineIcon {...props} />;
}
