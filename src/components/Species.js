import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Species = () => {
  const [selectedSpeciesCategory, setSelectedSpeciesCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 1000;

    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  const handleSpeciesCategoryChange = (category) => {
    setSelectedSpeciesCategory(category);
  };

  const fishSpecies = [
    {
      name: "Black Sea Bass",
      category: "saltwater",
      description:
        "Black sea bass are popular game fish found in the Northeast's coastal waters. Known for their striking appearance and delicious taste, these fish are prized by anglers and seafood enthusiasts alike. With their dark coloration and prominent dorsal fin spines, black sea bass are easily recognizable. They inhabit rocky structures, wrecks, and reefs, where they feed on a variety of small fish and crustaceans. Anglers enjoy targeting black sea bass for their strong fights and delectable fillets, making them a prized catch in the Northeast's saltwater fisheries.",
      image: require("../images/blackseabass.jpg"),
    },
    {
      name: "Bluefish",
      category: "saltwater",
      description:
        "Bluefish are highly aggressive saltwater predators commonly found in the Atlantic Ocean. With their sharp teeth, powerful jaws, and streamlined bodies, they are formidable fighters sought after by anglers. Known for their intense feeding frenzies, bluefish can swiftly strike baitfish with lightning speed. Their vibrant blue-green coloration and silver sides make them visually striking. Bluefish are opportunistic feeders, preying on schools of smaller fish, including mackerel and herring. Anglers appreciate the thrilling battles these voracious predators provide, as they test both skill and endurance. Reeling in a bluefish guarantees an adrenaline-filled experience for saltwater fishing enthusiasts.",
      image: require("../images/bluefish.jpg"),
    },
    {
      name: "Bluegill",
      category: "freshwater",
      description:
        "Bluegill, also known as Lepomis macrochirus, is a popular panfish found in freshwater lakes, ponds, and slow-moving rivers. They have a characteristic deep blue color on their gill covers and a dark spot at the base of their dorsal fin. Bluegill have a compressed body shape and are known for their vibrant colors and distinctive black opercular flap. They typically have a small mouth and feed on insects, small fish, and aquatic vegetation. Bluegill are highly prized by anglers, especially for their willingness to bite on a variety of baits and lures. They provide a great angling experience, especially for beginners.",
      image: require("../images/bluegill.jpg"),
    },
    {
      name: "Bonito",
      category: "saltwater",
      description:
        "Bonito, scientifically known as Sarda sarda, are an exciting species found in the Northeast coastal waters. These fast and powerful fish are characterized by their sleek bodies, silver coloration, and distinctive racing stripes. Bonito are known for their aggressive feeding behavior and thrilling fights when hooked. Anglers often target them for their speed and agility, as they make spectacular runs and leaps. With their impressive fighting ability and abundance in the Northeast, bonito provide a thrilling challenge and rewarding experience for anglers seeking an exhilarating saltwater fishing adventure.",
      image: require("../images/bonito.jpg"),
    },
    {
      name: "Carp",
      category: "freshwater",
      description:
        "Trout are prized freshwater fish found abundantly in the Northeastern region. With their vibrant colors and elusive nature, they are a favorite target for anglers. Trout species like Rainbow Trout, Brown Trout, and Brook Trout thrive in cold, clear streams and lakes, making them excellent targets for fly fishing enthusiasts. These beautiful fish are known for their agility, striking patterns, and delicious taste. Whether you're wading in a remote mountain stream or casting from the banks of a serene lake, pursuing trout in the Northeast promises unforgettable angling experiences and the opportunity to reel in these coveted game fish.",
      image: require("../images/carp.jpg"),
    },
    {
      name: "Catfish",
      category: "freshwater",
      description:
        "Catfish, specifically the Channel Catfish (Ictalurus punctatus), are common freshwater fish in the Northeast. They have a cylindrical body with barbels around their mouth. Growing over 3 feet long and weighing more than 40 pounds, they are known for scavenging and feeding on a variety of food including fish, insects, and plants. Anglers target catfish using natural baits and lures, and they provide a thrilling fight when hooked. Catfish are prized for their delicious flesh, making them a popular catch in the Northeast.",
      image: require("../images/catfish.jpg"),
    },
    {
      name: "Chain Pickerel",
      category: "freshwater",
      description:
        "The chain pickerel, a popular game fish in the Northeast, is a fierce predator known for its aggressive nature and sharp teeth. With its elongated body and distinct chain-like markings, this species thrives in freshwater habitats such as lakes, ponds, and slow-moving rivers. Chain pickerel are prized by anglers for their thrilling strikes and acrobatic fights. They primarily feed on smaller fish and have a reputation for being opportunistic hunters. Anglers in the Northeast region cherish the challenge and excitement that targeting chain pickerel brings to their fishing adventures.",
      image: require("../images/pickerel.jpg"),
    },
    {
      name: "Cod",
      category: "saltwater",
      description:
        "Cod are known for their significant historical and commercial value. These cold-water fish inhabit the North Atlantic Ocean and are sought after by both recreational and commercial fishermen. Cod are characterized by their elongated bodies, barbels on their chins, and a distinct white lateral line running along their sides. They are voracious predators, feeding on smaller fish, crustaceans, and squid. Cod are prized for their firm, flaky white flesh, making them a popular target for anglers and a staple in seafood cuisine.",
      image: require("../images/cod.jpg"),
    },
    {
      name: "Crappie",
      category: "freshwater",
      description:
        "Crappie refers to two closely related species: Black Crappie (Pomoxis nigromaculatus) and White Crappie (Pomoxis annularis). They are popular gamefish found in freshwater lakes, reservoirs, and rivers across the United States, including the Northeast region. Crappie have a distinctively deep body and are characterized by their large dorsal fin and speckled coloration. Black Crappie have irregular black spots on a silver background, while White Crappie have vertical bars on their sides. They primarily feed on small fish, insects, and crustaceans. Crappie are known for their schooling behavior and can provide exciting fishing opportunities, especially during their spring spawning season.",
      image: require("../images/crappie.jpg"),
    },
    {
      name: "False Albacore",
      category: "saltwater",
      description:
        'False albacore, commonly known as "albies," are a thrilling catch for anglers in the Northeast. These fast and powerful fish are prized for their speed and acrobatic displays. Found in coastal waters, false albacore are known for their distinctive dark stripes and streamlined bodies. They migrate seasonally, providing exciting opportunities for anglers to target them with light tackle and fast retrieves. Albies are highly prized for their fierce fights and make for excellent sport fishing. Their explosive strikes and relentless runs make them a favorite among Northeast anglers seeking an adrenaline-pumping fishing adventure.',
      image: require("../images/falsealbacore.jpg"),
    },

    {
      name: "Flounder",
      category: "saltwater",
      description:
        "Flounder, a popular saltwater flatfish, is known for its unique body shape and remarkable camouflage abilities. With both eyes positioned on one side of their flat bodies, flounders are expert ambush predators. They lie motionless on the ocean floor, blending seamlessly with their surroundings, before striking at unsuspecting prey. Found in coastal waters, flounders have a delicate white flesh that is highly regarded for its mild flavor. Anglers enjoy targeting these elusive fish, employing techniques such as bottom fishing or using specialized flounder rigs to entice them. Catching a flounder promises a tasty reward and a satisfying angling experience.",
      image: require("../images/flounder.jpg"),
    },
    {
      name: "Haddock",
      category: "saltwater",
      description:
        "Haddock are a species of groundfish commonly found in the Northeast region. They have a distinctive dark lateral line and a silver-gray body with a blackish-splotched upper side. Haddock prefer colder waters and are typically found in depths ranging from 50 to 200 meters. They feed on small fish, crustaceans, and mollusks. Haddock is a popular target for commercial and recreational fishing due to its firm, white flesh and mild flavor. It is commonly used in various culinary dishes, including fish and chips, chowders, and baked preparations.",
      image: require("../images/haddock.jpg"),
    },
    {
      name: "Halibut",
      category: "saltwater",
      description:
        "Halibut are prized game fish found in the Northeast region's coastal waters. These flat-bodied giants can grow to impressive sizes, reaching lengths of over 8 feet and weighing several hundred pounds. Known for their delicious, flaky white meat, halibut are highly sought after by both recreational and commercial fishermen. Anglers appreciate the challenge of reeling in these powerful creatures, which often require strength and skill to land. Halibut fishing in the Northeast offers an exciting opportunity to catch a trophy-sized fish and enjoy a tasty seafood feast.",
      image: require("../images/halibut.jpg"),
    },
    {
      name: "Herring",
      category: "saltwater",
      description:
        "Herring, a small, silver-colored fish, is abundant in the Northeast and plays a significant role in both the ecosystem and fishing industry. Known for their schooling behavior, herring form large, migratory groups along the coast. Besides being a staple in commercial fisheries, herring is highly valued as bait by recreational anglers. Its oily flesh and strong aroma make it an irresistible lure for predatory species like striped bass, bluefish, and tuna. Anglers commonly use whole herring, either fresh or frozen, as bait, threading it onto hooks or employing specialized rigs to imitate a natural swimming motion. The scent and appearance of herring make it a go-to choice for attracting and enticing game fish in the Northeast's rich fishing grounds.",
      image: require("../images/herring.jpg"),
    },
    {
      name: "Largemouth Bass",
      category: "freshwater",
      description:
        "Largemouth Bass (Micropterus salmoides) is a popular freshwater game fish found in the Northeast. Known for their aggressive nature and impressive size, they are prized by anglers. Largemouth Bass have a distinctive elongated body, olive-green coloration, and a large mouth with a protruding lower jaw. They prefer calm, weedy areas in lakes, ponds, and rivers. Largemouth Bass are opportunistic predators, feeding on a variety of prey including fish, crayfish, and insects. Catching a trophy-sized Largemouth Bass provides an exhilarating experience for anglers in the Northeast.",
      image: require("../images/largemouthbass.jpg"),
    },
    {
      name: "Mackerel",
      category: "saltwater",
      description:
        "Mackerel is a fast-swimming species that forms large schools, making it a popular target for both commercial and recreational fishing. It is often used in various culinary preparations, such as grilling, smoking, or pickling. Mackerel is not only sought after for its culinary qualities but also highly valued as bait in the Northeast. Its oily and strongly scented flesh makes it an excellent choice for attracting larger predatory fish species. Anglers often use fresh or frozen mackerel as bait when targeting species like striped bass, bluefish, tuna, or shark. Mackerel can be cut into chunks, filleted, or used whole on fishing hooks to entice and lure these game fish.",
      image: require("../images/mackerel.jpg"),
    },
    {
      name: "Muskellunge(Muskie)",
      category: "freshwater",
      description:
        "The Muskie, also known as the <span class='quote'>fish of a thousand casts,</span> is a formidable predator found in the Northeastern waters. With its elongated body, sharp teeth, and aggressive nature, it poses a thrilling challenge for anglers seeking an adrenaline-filled fishing experience. Known for its explosive strikes and powerful fights, landing a Muskie requires skill and perseverance. With a reputation for being elusive and cunning, this apex predator commands respect among anglers. Catching a Muskie in the Northeast is a testament to both angling prowess and the allure of chasing one of freshwater fishing's most prized trophies.",
      image: require("../images/muskie.jpg"),
    },
    {
      name: "Northern Pike",
      category: "freshwater",
      description:
        "The Northern Pike, a formidable predator, is a prized freshwater game fish found in the Northeastern region. With its long, slender body and sharp teeth, it is known for its aggressive strikes and thrilling fights. A voracious feeder, the Northern Pike preys on smaller fish, making it a challenging catch for anglers seeking an adrenaline-filled battle. With its distinctive greenish coloring and mottled patterns, the Northern Pike is not only an exciting catch but also a visually striking fish. Experienced anglers in the Northeast eagerly pursue the thrill of landing this powerful predator on their lines.",
      image: require("../images/pike.jpg"),
    },
    {
      name: "Perch",
      category: "freshwater",
      description:
        "Perch typically refers to Yellow Perch (Perca flavescens), which is a popular freshwater fish found in the Northeastern United States. They inhabit lakes, ponds, and rivers and are known for their distinctive yellow coloration with vertical dark stripes on their sides. Yellow Perch have a laterally compressed body shape and a spiny dorsal fin. They feed on small fish, insects, and aquatic invertebrates. Perch are prized by anglers for their delicious flesh and can be caught using a variety of techniques, including bait fishing, jigging, and trolling. They provide good sport and are often targeted by ice fishermen during the winter months.",
      image: require("../images/perch.jpg"),
    },
    {
      name: "Pollock",
      category: "saltwater",
      description:
        "Pollock are cold-water fish and are closely related to cod. They are known for their silver-colored bodies and distinctive dark lateral line. Pollock can be found in both offshore and nearshore waters, often forming large schools. They are opportunistic feeders, consuming a variety of prey including small fish, squid, and crustaceans. Pollock have become popular targets for both recreational and commercial fishing due to their abundance and delicious, delicate white flesh, which is prized in culinary preparations.",
      image: require("../images/pollock.jpg"),
    },
    {
      name: "Rock Bass",
      category: "freshwater",
      description:
        "Rock Bass, scientifically known as Ambloplites rupestris, are a sought-after freshwater species found in North America. With their stout bodies and distinctive coloration, featuring dark olive-green backs transitioning to lighter hues on their bellies, Rock Bass are a visually striking fish. They are commonly found in rocky areas of rivers, lakes, and streams, showcasing their adaptability to various aquatic habitats. Anglers are drawn to Rock Bass for their aggressive feeding behavior and the excitement they bring to fishing trips. Known for their strong fights and willingness to strike on a variety of lures, Rock Bass provide an engaging challenge for fishing enthusiasts.",
      image: require("../images/rockbass.jpg"),
    },
    {
      name: "Salmon",
      category: "freshwater",
      description:
        "Salmon, a prized species in the Northeast, is renowned for its strength and remarkable migratory journey. These magnificent fish, such as the Atlantic salmon, are known for their silver coloration and streamlined body. In the Northeast, they navigate their way from the ocean to freshwater rivers and streams to spawn. Anglers eagerly await the arrival of salmon, as they offer an exhilarating challenge and delicious reward. Whether fly fishing in a remote river or trolling along the coastline, pursuing salmon in the Northeast is an unforgettable experience for passionate anglers.",
      image: require("../images/salmon.jpg"),
    },
    {
      name: "Scup",
      category: "saltwater",
      description:
        "Scup, also known as porgy, is a species of fish commonly found in the coastal waters of the Northeast region. They have a deep-bodied shape with a silvery-gray coloration and distinct black markings on their fins. Scup are known for their schooling behavior and can be found in large numbers around rocky reefs and sandy bottoms. They primarily feed on small invertebrates and algae. Scup are popular among recreational anglers for their abundance, ease of catch, and tasty white flesh, making them a popular target for both novice and experienced fishermen.",
      image: require("../images/scup.jpg"),
    },
    {
      name: "Smallmouth Bass",
      category: "freshwater",
      description:
        "Smallmouth Bass (Micropterus dolomieu) is a highly sought-after freshwater game fish in the Northeast region. With their distinctive bronze coloration and vertical dark stripes, Smallmouth Bass are known for their feisty nature and acrobatic jumps when hooked. They inhabit clear, rocky streams, rivers, and lakes. Smallmouth Bass are known to be skilled predators, feeding on crayfish, minnows, and insects. Anglers enjoy the challenge of catching Smallmouth Bass due to their strength and agility. Landing a Smallmouth Bass provides an exciting angling experience and a rewarding catch for Northeastern fishermen.",
      image: require("../images/smallmouth.jpg"),
    },
    {
      name: "Striped Bass",
      category: "saltwater",
      description:
        "The striped bass, commonly found in the Northeast region, is a prized saltwater gamefish known for its power and agility. With its silver body adorned by dark, horizontal stripes, it showcases a striking appearance. Striped bass are highly migratory, navigating coastal waters and estuaries during their annual spawning runs. Anglers eagerly pursue these elusive predators, as they provide thrilling fights and test the skill of even the most experienced fishermen. Their robust population in the Northeast makes them a popular target for both recreational and commercial fishing, offering enthusiasts an exciting opportunity to reel in this iconic species.",
      image: require("../images/striper.jpg"),
    },
    {
      name: "Sunfish",
      category: "freshwater",
      description:
        "Sunfish is a broad term that encompasses various species within the Centrarchidae family. They include popular fish like Pumpkinseed, Redbreast Sunfish, and Longear Sunfish. Sunfish are typically small to medium-sized, with vibrant colors and unique patterns on their bodies. They have a rounded shape and are often characterized by a bright orange or red spot near their gill cover. Sunfish are commonly found in freshwater bodies such as lakes, ponds, and slow-moving rivers. They feed on insects, small crustaceans, and occasionally small fish. Sunfish are known for their aggressive strikes and provide enjoyable fishing experiences, particularly for anglers targeting panfish.",
      image: require("../images/sunfish.jpg"),
    },
    {
      name: "Tautog",
      category: "saltwater",
      description:
        "Tautog, also known as blackfish, are a species of fish found along the Northeast coast of the United States. They have a stout, bluish-black body with a large head and sharp teeth. Tautog are known for their strong, stubborn nature and are prized by anglers for their challenging fight. They inhabit rocky coastal areas and feed on crustaceans, mollusks, and small fish. Tautog are highly regarded for their delicious white flesh, making them a popular target for recreational and commercial fishing.",
      image: require("../images/tautog.jpg"),
    },
    {
      name: "Trout",
      category: "freshwater",
      description:
        "Trout are prized freshwater fish found abundantly in the Northeastern region. With their vibrant colors and elusive nature, they are a favorite target for anglers. Trout species like Rainbow Trout, Brown Trout, and Brook Trout thrive in cold, clear streams and lakes, making them excellent targets for fly fishing enthusiasts. These beautiful fish are known for their agility, striking patterns, and delicious taste. Whether you're wading in a remote mountain stream or casting from the banks of a serene lake, pursuing trout in the Northeast promises unforgettable angling experiences and the opportunity to reel in these coveted game fish.",
      image: require("../images/trout.jpg"),
    },
    {
      name: "Tuna",
      category: "saltwater",
      description:
        "Tuna captivates anglers with its power and agility. Found in the Atlantic Ocean, species like the bluefin tuna are known for their impressive size and speed. These muscular fish, with their distinctive torpedo-shaped bodies and metallic blue backs, are highly sought after for their thrilling fights and delicious meat. Whether targeting them offshore or participating in tuna tournaments, pursuing these apex predators in the Northeast offers an exhilarating challenge for passionate anglers seeking an unforgettable fishing experience.",
      image: require("../images/tuna.jpg"),
    },
    {
      name: "Walleye",
      category: "freshwater",
      description:
        "The Walleye, a prized game fish in the Northeast, is known for its elusive nature and delectable flesh. With its olive-brown back and golden-yellow sides, it showcases a distinctive appearance. Renowned for its excellent vision in low-light conditions, the Walleye is most active during dawn and dusk, offering anglers the perfect opportunity for a thrilling fishing experience. With its aggressive strikes and powerful fights, landing a Walleye is a test of skill and patience. Anglers in the Northeast cherish the challenge of targeting this prized species and savoring its succulent meat.",
      image: require("../images/walleye.jpg"),
    },
  ];

  const handleFlipCard = (e) => {
    e.currentTarget.classList.toggle("flipped");
  };

  const filteredFishSpecies =
    selectedSpeciesCategory === "all"
      ? fishSpecies
      : fishSpecies.filter(
          (species) => species.category === selectedSpeciesCategory
        );

  return (
    <div>
      <h1 className="species-page-header">Fish Species of the Northeast</h1>
      <div>
        <select
          className="species-select"
          value={selectedSpeciesCategory}
          onChange={(e) => handleSpeciesCategoryChange(e.target.value)}
        >
          <option value="all">All Species</option>
          <option value="saltwater">Saltwater Species</option>
          <option value="freshwater">Freshwater Species</option>
        </select>
      </div>
      <div className="card-container">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          filteredFishSpecies.map((species) => (
            <div
              key={species.name}
              className="flip-card"
              onClick={handleFlipCard}
            >
              <Card className="species-card">
                <div className="cardFront">
                  <Card.Title>{species.name}</Card.Title>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={species.image}
                      alt={species.name}
                    />
                  </Card.Body>
                </div>
                <div className="cardBack">
                  <Card.Title>{species.name}</Card.Title>
                  <Card.Body>
                    <Card.Text>{species.description}</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Species;
