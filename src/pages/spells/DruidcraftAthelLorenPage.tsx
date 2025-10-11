import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export const DruidcraftAthelLorenPage = () => {
  const druidSpells = [
    {
      name: "Animal Companion",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Out of Game (B)",
      effect:
        "The spellcaster summons an animal companion of their choice from the following options to become a permanent member of their warband: bear, ice toad, snow leopard, or wolf. All Animal Companions count as standard soldiers. Animal companions are more strong-willed than wild examples of their species and receive a permanent +3 Will. A spellcaster may only have one animal companion at any time.",
    },
    {
      name: "Control Animal",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "The target animal must make an immediate Will Roll with a Target Number equal to the Casting Roll. If the roll fails, the animal becomes a temporary member of the spellcaster's warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one animal at a time.",
    },
    {
      name: "Beast Cry",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Area Effect",
      effect:
        "At the end of every turn after this spell is cast, roll a die. On a 10+, roll for a random encounter. If the roll is 17+, the spellcaster may choose the board edge from which the creature enters. This spell represents the Druid calling out to the wild beasts of the region, drawing them to the battlefield.",
    },
    {
      name: "Beast Strength",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        "The target figure gains +1 Fight for the rest of the game. This represents the primal strength of beasts flowing through the target. Multiple castings of Beast Strength on the same target have no effect.",
    },
    {
      name: "Command Creature",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        "This spell may be cast upon any animal, saurian, or aquatic creature that is not currently under the control of any warband. The creature must make a Will Roll with a Target Number equal to the Casting Roll to resist. If the creature fails the Will Roll, the spellcaster may immediately cause it to take one action. If the creature is not currently in combat, that action must be movement. The spellcaster may force the creature to make any legal move, so far as that movement does not cause the creature direct harm (e.g. falling, walking into fire). If the creature is in combat, the spellcaster can make it attack any figure with which it is in combat, or may compel it to use a movement action to move out of combat.",
    },
    {
      name: "Envenom",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        "The target of this spell has its weapon coated in a potent venom. The next time this figure causes a damaging attack, either in melee combat or by shooting, the victim of that attack becomes Poisoned. If the Poisoned rule is not in use, the victim instead suffers an additional 3 points of damage. The target of this spell must be carrying an actual weapon.",
    },
    {
      name: "Summon Animal",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Area Effect",
      effect:
        "Roll a die to see what type of animal has been summoned: 1-4 mountain goat, 5-7 large snake, 8-10 blood-drinker bat, 11-13 screamer monkey, 14-16 giant wasp, 17-19 snapping turtle, 20 large lizard. At the end of this turn, place the summoned animal on the table, touching any table edge except the one opposite the spellcaster's starting edge. This animal becomes a temporary member of the spellcaster's warband for the rest of the game. A spellcaster may not cast this spell if they already have a summoned animal on the table.",
    },
    {
      name: "Thorn Wall",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        'The spellcaster causes a wall of thorns and vines to erupt from the ground. This creates a 6"-long, 3"-high wall of thorny brambles, part of which must be within 10" and line of sight of the spellcaster. This wall can be climbed as normal, but any figure that moves through or climbs the wall suffers an immediate +2 non-magic attack. The wall blocks line of sight. At the end of each turn, after the turn in which the spell was cast, roll a die: on a 1-3 the wall withers and is removed from the table.',
    },
    {
      name: "Wild Fury",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "The target is filled with the savage fury of a wild beast. The target gains +2 Fight and +1 Move but suffers -2 Will for the rest of the game. Additionally, while under the effects of this spell, the figure must move towards the nearest enemy figure if able, and must attack if in combat. The target may make a Will Roll with a Target Number equal to the Casting Roll at the end of each of its activations. If successful, the spell is cancelled. This spell may only be cast on living creatures (not undead or constructs). Multiple castings of Wild Fury on the same target have no effect.",
    },
    {
      name: "Earth Blood",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Choose a target within 12". This spell grants the target +2 Health for the rest of the game. This can take a figure over its starting Health. A figure may only have one Earth Blood spell cast on it per game.',
    },
    {
      name: "Earth Wave",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'The spellcaster creates a small wave of earth that can be used to carry inanimate objects that are on the ground. The spellcaster may move any treasure token up to 4" so long as it is on the ground, stays in line of sight, and avoids any terrain. This spell has no effect on any treasure that has special requirements to pick up.',
    },
    {
      name: "Earthen Wall",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'This spell creates an earthen wall, 3" long, 2" high, and 1" wide. Some part of this wall must be within 8" of the spellcaster, and all of it must be within line of sight when it is cast. This wall may be climbed in the normal way, or any figure in base contact with the wall may attempt to destroy it by spending an action to make a Fight Roll with a Target Number of 16.',
    },
    {
      name: "Parapet",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'This spell creates a small stone wall, 2" long and 0.5" high, all of which must be within 14" of the spellcaster. This wall does not block line of sight, but does provide heavy cover to anyone standing directly behind it and may also act as intervening terrain. This wall remains until the end of the game.',
    },
    {
      name: "Pit",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Select a target figure. A 2" deep pit opens up directly beneath the target figure. The pit is just large enough to contain the figure. The target may make a Move Roll with a Target Number of 20 in order to avoid falling in the pit, but this roll is optional. If the roll is successful, the player controlling the target may place the figure anywhere adjacent to the hole. This spell may not be cast against Large creatures and may only be cast when there is a legal target figure. The pit lasts until the end of the game. This may be cast on a figure in combat. If the figure falls into the pit, it is no longer considered to be in combat.',
    },
    {
      name: "Projectile",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        "The spellcaster makes a +3 magic shooting attack against one figure within line of sight. If the attack hits, it does +2 damage.",
    },
    {
      name: "Cloud Cover",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Thick, dark clouds form in the sky and slowly block out the sun. On the turn the spell is cast, the maximum line of sight for the game is reduced to 16". Every turn after this, the maximum line of sight decreases by another 2", to a minimum of 12".',
    },
    {
      name: "Dust Devil",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        "Creates a dust devil (small whirlwind creature) anywhere within 6\" of the caster. This creature activates immediately after the spellcaster's activation. This creature is removed from the table at the end of the turn.",
    },
    {
      name: "Lightning Strike",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "Pick a target within 20\" and in line of sight. At the end of the target figure's next activation, after it has taken all of its actions, make a +6 attack against it. This is considered a non-magic attack. Additionally, if the figure is wearing heavy armour, subtract 2 from its Armour for the purpose of determining damage.",
    },
    {
      name: "True Flight",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        "This spell may only be cast on a member of the spellcaster's warband who is within 8\" and is carrying either a bow or crossbow. The next time that figure makes a shooting attack, it receives a +3 to its Shooting Roll.",
    },
    {
      name: "Wind Blast",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Pick a target figure within 20" and in line of sight. This figure may not be part of the same warband as the spellcaster. That figure must make a Will Roll with a Target Number equal to the Casting Roll. If the target fails its Will Roll, the spellcaster may move the target figure up to 4" in a straight line in any horizontal direction. The target may not be moved through terrain, or other figures, but may be moved into combat or off terrain that is above the ground. This may take a figure out of combat.',
    },
    {
      name: "Wind Walk",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Self Only",
      effect:
        "The spellcaster may immediately move 6\" in any direction (including vertically), without being subject to any penalties for movement (e.g. climbing, rough ground, carrying treasure). They may even move themselves down off of terrain. However, if this leaves the spellcaster in mid-air, they will immediately fall to the ground, suffering the usual damage for falls, from the point at which the spell's movement ended.",
    },
    {
      name: "Bark",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        "The target of this spell receives +1 Armour for the rest of the game. This spell has no effect on a target that already has Armour of 14 or higher. Multiple castings of Bark on the same target have no effect.",
    },
    {
      name: "Brambles",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Creates a line of dense brambles 6" long, 1" wide, and 1" tall. The brambles do not block line of sight, but may count as intervening terrain. Any figure that wishes to climb over the brambles must first make a Will Roll with a Target Number of 14. If they fail, their current action ends immediately.',
    },
    {
      name: "Ladder",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 6,
      range: "Line of Sight",
      effect:
        "This spell creates a permanent ladder of any height attached to the side of a terrain piece. Figures using this ladder do not suffer any movement penalties for climbing.",
    },
    {
      name: "Plant Walk",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'This spell may be cast on any piece of terrain that is primarily composed of vegetation. The spellcaster may move this terrain piece up to 3" in any direction. The terrain piece may not be moved onto or through another terrain piece or figure.',
    },
    {
      name: "Snare",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        "The target of this spell is ensnared in clinging weeds and vines. Each time the target is activated, it must make a Fight Roll with a Target Number of 15 (creatures with the Large trait receive +4 to this roll). If the target fails, it may take only one action during its next activation, which cannot be movement. Once a target has made its Fight Roll, it has escaped the vines and is no longer ensnared.",
    },
    {
      name: "Warp Weapon",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        "After naming the target of this spell, the caster picks one of the target's weapons. The spell causes it to warp and potentially become useless. Roll a die and consult the following table. Add +5 if the weapon is Superior, and +10 if it is magic. 1-10: weapon destroyed, 11-15: weapon badly warped (-1 Fight), 16-20: weapon warped (-1 damage), 21+: weapon undamaged. The effects of this spell are permanent. This spell may be cast multiple times against the same weapon and penalties do stack.",
    },
    {
      name: "Amphibious",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 6,
      range: "Line of Sight",
      effect:
        "The target of this spell counts as amphibious for the rest of the game. If the spellcaster casts this spell on themselves, they gain +3 on the Casting Roll.",
    },
    {
      name: "Current",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'If the target of this spell is in deep water, the caster may move the target up to 4" in any horizontal direction, provided it does not move onto or over terrain or a boat. This spell may be cast on a small boat, with the same restrictions.',
    },
    {
      name: "Mist",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'Creates a thick, circular cloud of mist 4" in diameter and 3" high. The mist does not block line of sight, but does provide a +3 modifier to the target of any shooting attacks that draw line of sight through it (i.e. the target gets +3 on its Fight Roll). The spellcaster who cast Mist may choose to remove it from the board at any time as a free action. Otherwise, it lasts until the end of the game.',
    },
    {
      name: "Pool",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 10,
      range: "Line of Sight",
      effect:
        'Creates a pool of deep water 3" in diameter. The pool can be placed anywhere, provided some part of it is within line of sight of the caster. Any figures standing where the pool is placed can make a Move Roll with a Target Number of 14. If they succeed, the player controlling the figure may place it anywhere adjacent to the pool. If they fail, they stay where they are and fall in the water.',
    },
    {
      name: "Water of Life",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'This spell restores 3 points of Health to a target model within 12". The spell cannot take the model above its starting Health. This spell has no effect on undead or demons.',
    },
    {
      name: "Wrath of the Waves",
      school: "Druidcraft of the Athel Loren",
      castingNumber: 8,
      range: "Line of Sight",
      effect:
        'The target of this spell must either be in the water or within 4" of a body of water that is at least 2" in diameter. This figure suffers an immediate +5 attack.',
    },
  ];

  return (
    <PageContainer>
      <Header title="Druidcraft of the Athel Loren" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Druidcraft of the Athel Loren</PowerListTitle>

          <ParchmentText>
            Os Spellsingers de Athel Loren são guardiões místicos da floresta
            ancestral, tecendo magias que ecoam a vontade da própria floresta.
            Suas canções mágicas invocam os espíritos das árvores antigas,
            comandam as bestas selvagens e moldam os elementos naturais com
            harmonia e graça élfica. Diferente dos magos que manipulam os Ventos
            da Magia, os Spellsingers canalizam o poder primordial da natureza
            através de sua conexão profunda com Athel Loren, criando magias mais
            estáveis porém menos voláteis em poder bruto.
          </ParchmentText>

          <ParchmentText>
            Esta escola de magia é exclusiva dos Spellsingers Wood Elf e
            representa sua ligação ancestral com a floresta mágica de Athel
            Loren. Cada spell é uma canção para os espíritos da natureza, uma
            dança com os ventos da floresta, um sussurro aos animais selvagens
            ou um comando às próprias árvores antigas que protegem o reino
            élfico há milênios.
          </ParchmentText>

          <PowerListTitle>Spells ({druidSpells.length} Total)</PowerListTitle>

          {druidSpells.map((spell, index) => (
            <SpellCard
              key={index}
              name={spell.name}
              school={spell.school}
              castingNumber={spell.castingNumber}
              range={spell.range}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
};
