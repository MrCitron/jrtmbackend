import { IRace } from 'app/shared/model/race.model';
import { IProfession } from 'app/shared/model/profession.model';
import { CharacterType } from 'app/shared/model/enumerations/character-type.model';

export interface ICharacter {
  id?: number;
  name?: string;
  type?: CharacterType;
  level?: number;
  race?: IRace;
  profession?: IProfession;
}

export const defaultValue: Readonly<ICharacter> = {};
