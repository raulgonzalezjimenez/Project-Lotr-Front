export type Character = {
  race: Race;
  name: string;
  description: string;
  imgUrl: string;
  id: string;
};
export type Race = 'men' | 'elve' | 'dwarf' | 'urukhai' | 'orc' | 'hobbit';
