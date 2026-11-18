import type { ApiArticle } from "@/lib/api/raw";

const plate = (photo: string, alt: string): ApiArticle["media"] => ({
  src: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1400&q=75`,
  alt,
  width: 1400,
  height: 933,
  credit: "Unsplash",
});

type Seed = {
  slug: string;
  headline: string;
  dek: string;
  summary: string;
  body: string;
  section: [string, string];
  byline: string;
  published_at: string;
  media: ApiArticle["media"];
  featured?: boolean;
  editors?: boolean;
  photo?: boolean;
  rank?: number;
  minutes?: number;
  order: number;
};

function story(seed: Seed): ApiArticle {
  return {
    uuid: `ember-${String(seed.order).padStart(2, "0")}`,
    slug: seed.slug,
    headline: seed.headline,
    dek: seed.dek,
    summary: seed.summary,
    body_markdown: seed.body,
    section_slug: seed.section[0],
    section_name: seed.section[1],
    byline: seed.byline,
    published_at: seed.published_at,
    updated_at: seed.published_at,
    media: seed.media,
    flags: {
      featured: Boolean(seed.featured),
      editors_pick: Boolean(seed.editors),
      photo_story: Boolean(seed.photo),
    },
    trending_rank: seed.rank ?? null,
    reading_minutes: seed.minutes ?? 5,
    desk_order: seed.order,
  };
}

const world = ["world", "World"] as [string, string];
const politics = ["politics", "Politics"] as [string, string];
const business = ["business", "Business"] as [string, string];
const culture = ["culture", "Culture"] as [string, string];
const science = ["science", "Science"] as [string, string];
const climate = ["climate", "Climate"] as [string, string];
const sport = ["sport", "Sport"] as [string, string];
const opinion = ["opinion", "Opinion"] as [string, string];

export const mockApiArticles: ApiArticle[] = [
  story({
    order: 1,
    featured: true,
    rank: 1,
    minutes: 6,
    slug: "ports-reopen-after-a-nine-day-halt",
    headline: "Ports reopen on the strait after a nine-day halt",
    dek: "The first ship through was not a symbol. It was a timetable, posted by hand before dawn.",
    summary: "After nine quiet days, pilots took a container ship through the strait and the night market switched its lights back on.",
    section: world,
    byline: "Mira Adelman",
    published_at: "2026-11-18T11:05:00.000Z",
    media: plate("photo-1494412574643-ff11af0c31dd", "Container cranes along a working harbour"),
    body: `The halt lasted nine days. Ferries stayed at the quay, the night market learned a thinner kind of quiet, and the pilots drank coffee they did not need.

**What changed on the tenth morning** was not a speech. A clerk pinned a timetable to the harbour office door with a brass tack that had been waiting in a drawer.

- The east berth opened at 05:40.
- Two pilots took the first container ship through.
- Stallholders were back before the second sailing.

The harbour master's public note sits in the long record of straits and the people who time them, which you can read in outline at [the encyclopaedia entry on straits](https://en.wikipedia.org/wiki/Strait).

![Cranes along the quay at first light](https://images.unsplash.com/photo-1494412574643-ff11af0c31dd?auto=format&fit=crop&w=1400&q=75)

By noon the radio had a queue again. Nobody called it a reopening. They called it Thursday.`,
  }),
  story({
    order: 2,
    featured: true,
    editors: true,
    rank: 2,
    minutes: 7,
    slug: "the-late-night-vote-that-rewrote-housing",
    headline: "The late-night vote that rewrote the housing bill",
    dek: "Clause 14 survived. The speech that was meant to kill it did not.",
    summary: "A housing bill left committee with one clause intact that three parties had promised to bury.",
    section: politics,
    byline: "Jonah Voss",
    published_at: "2026-11-18T09:40:00.000Z",
    media: plate("photo-1541872703-74c5e44368f9", "A domed assembly building at dusk"),
    body: `The vote was called at 00:17, which is the hour when language gets careless and whips get precise.

Clause 14 was supposed to be the sacrifice. It asked cities to publish, every quarter, the number of homes they had permitted and the number they had actually opened. Three parties had agreed, quietly, that the clause was naïve.

**It passed by four votes.** Two of them came from members who had spoken against it at dinner.

The interesting part is not the drama. It is the spreadsheet a junior clerk had been keeping since March, with a column for "promised" and a column for "keyed". That sheet is now part of the bill's life, in the way a [public legislative record](https://en.wikipedia.org/wiki/Bill_(law)) always outlasts the speech.

Nobody on the floor looked relieved. They looked like people who would have to explain a number in the morning.`,
  }),
  story({
    order: 3,
    featured: true,
    rank: 3,
    minutes: 5,
    slug: "coppers-quiet-spike",
    headline: "Copper's quiet spike, and the factories feeling it",
    dek: "The price moved before the headlines did. The floor managers already knew.",
    summary: "A copper move that barely made the terminals is already changing what mid-size factories order on Mondays.",
    section: business,
    byline: "Samir Patel",
    published_at: "2026-11-18T08:15:00.000Z",
    media: plate("photo-1611974789855-9c2a0a7236a3", "Market screens glowing in a dark room"),
    body: `On the terminals it looked like a shrug. A few cents, then a few more, then a morning where the bids did not come back down for lunch.

Floor managers do not wait for the word "spike". They notice when the Monday wire order asks for a different gauge, and when the person who usually says yes asks for a day.

**Three factories** in the same river town changed their weekly metal buy without calling it a strategy. One of them posted the new price on the staff-room board, under the rota, because that is where numbers are believed.

The market pages will catch up. The rota already has.`,
  }),
  story({
    order: 4,
    featured: true,
    editors: true,
    photo: true,
    rank: 4,
    minutes: 6,
    slug: "lost-film-scores-find-a-room",
    headline: "A library of lost film scores finds a new room",
    dek: "The reels were labelled in pencil. The room has a lock that finally works.",
    summary: "A basement of unmarked film scores has been given a reading room, a catalogue, and a pianist on Thursdays.",
    section: culture,
    byline: "Helen Cho",
    published_at: "2026-11-17T18:20:00.000Z",
    media: plate("photo-1511379938547-c1f69419868d", "A dim room of musical instruments and cables"),
    body: `The boxes were not lost so much as unintroduced. Pencil on the spine, a year, sometimes a city, sometimes only "reel 2".

A foundation that usually restores buildings took the lease on a room above a tram stop and did the less glamorous thing: it bought folders. The catalogue is a spreadsheet with a column called "heard by".

On Thursdays a pianist plays whatever the week's folder can stand. People sit on chairs that do not match. Nobody claps if the page is incomplete, which is most of them.

If you want the longer history of why film music disappears, start with [film score](https://en.wikipedia.org/wiki/Film_score) and then come back for the folders. The folders are the story.`,
  }),
  story({
    order: 5,
    featured: true,
    photo: true,
    rank: 5,
    minutes: 7,
    slug: "the-glacier-drill-and-a-different-century",
    headline: "The glacier drill that came back with a different century",
    dek: "The core was cloudy where it should have been clear. The lab went quiet in a useful way.",
    summary: "A drill team pulled a core that does not match the century they expected, and the argument is now about method, not drama.",
    section: science,
    byline: "Leila Okonkwo",
    published_at: "2026-11-17T16:05:00.000Z",
    media: plate("photo-1464822759023-fed622ff2c3b", "A sharp mountain ridge under hard light"),
    body: `They were drilling for a baseline. Baselines are supposed to be boring, which is why they are trusted.

At 42 metres the core went cloudy. Not dirty, not cracked: cloudy, as if the ice had kept a winter it was not supposed to remember. The field notes from that hour are unusually neat. People write carefully when they think they might be wrong.

Back in the cold room, the first argument was about the bit, the second about the log, the third about a paper from 1998 that nobody wanted to be the one to cite first. The working theory is dull and therefore promising: a melt layer refroze and took the dust with it.

**Nothing here is a headline about the end of anything.** It is a discrepancy with a label on it. The team has published the method notes beside the photo of the core, which is the correct order.

![The ridge above the drill camp](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=75)`,
  }),
  story({
    order: 6,
    featured: true,
    rank: 6,
    minutes: 5,
    slug: "cooling-a-street-without-a-tree",
    headline: "Cities that cooled a street without planting a single tree",
    dek: "Shade, in this case, was a fabric and a timetable.",
    summary: "Two cities lowered the afternoon temperature of a market street with awnings, pale stone, and a delivery ban after noon.",
    section: climate,
    byline: "Idris Bennett",
    published_at: "2026-11-17T14:30:00.000Z",
    media: plate("photo-1466611653911-95081537e5b7", "Wind turbines turning over a dry ridge"),
    body: `The brief was almost rude: cool this street before August, and do not wait for a tree to become a tree.

One city hung sailcloth. Another replaced a band of dark asphalt with pale stone and told delivery vans to finish by noon. Neither project photographed as well as a sapling. Both showed a drop you could feel with your own patience, standing there at 15:00 with a thermometer that was not trying to be a metaphor.

The lesson is not that trees are optional. It is that a street has a schedule, and heat keeps it. Change the schedule and the heat arrives to a different room.

A plain account of urban heat lives at [urban heat island](https://en.wikipedia.org/wiki/Urban_heat_island). The awnings are not in it. They should be.`,
  }),
  story({
    order: 7,
    featured: true,
    rank: 7,
    minutes: 4,
    slug: "the-second-half-faster",
    headline: "She ran the marathon's second half faster than the first",
    dek: "The split was not a stunt. It was a decision made at kilometre nineteen.",
    summary: "A debut marathon was won by negative split, and the runner talked about the drink station she trusted.",
    section: sport,
    byline: "Nora Feld",
    published_at: "2026-11-17T12:10:00.000Z",
    media: plate("photo-1461896836934-ffe607ba6851", "Runners mid-stride on an open road"),
    body: `The first half was almost plain. She did not wave. She took water at the station where the volunteer knows to hold the cup by the rim.

At kilometre nineteen she changed the plan by a few seconds a mile, which is the sort of change only the people with a clipboard notice in the moment and everyone else notices at the finish.

**The second half was faster.** She said afterwards that the important thing was the cup, not the speech. The clipboard agrees.

Negative splits have a literature. This one has a name on a cup.`,
  }),
  story({
    order: 8,
    featured: true,
    editors: true,
    rank: 8,
    minutes: 6,
    slug: "what-we-get-wrong-about-local-news",
    headline: "What we keep getting wrong about local news",
    dek: "The obituary desk is not a sentimental extra. It is the memory.",
    summary: "Local news is not dying of a lack of passion. It is dying of a lack of Tuesday afternoons.",
    section: opinion,
    byline: "August Pell",
    published_at: "2026-11-17T10:00:00.000Z",
    media: plate("photo-1504711434969-e33886168f5c", "A stack of newspapers on a wooden table"),
    body: `We talk about local news as if it were a mood. It is a rota.

> The paper is not the building. The paper is the person who knows which school hall smells like floor varnish.

When a desk closes, the first thing that goes is not the investigation. Investigations are easy to romanticise and hard to schedule. The first thing that goes is the Tuesday afternoon: the planning committee, the second-team fixture, the correction to yesterday's spelling of a name.

**If you want to fund news, fund the afternoon.** Fund the person who stays long enough to hear the sentence after the sentence that was meant for the quote.

This desk exists because someone still thinks the afternoon is the product. I do too.`,
  }),
  story({
    order: 9,
    featured: true,
    photo: true,
    rank: 9,
    minutes: 6,
    slug: "night-trains-return",
    headline: "Night trains return to a route everyone said was finished",
    dek: "The 23:12 is back. The sandwiches are not a metaphor. They are cheese.",
    summary: "A night train that was written off five years ago is carrying passengers again, slowly and on purpose.",
    section: world,
    byline: "Ruth Keita",
    published_at: "2026-11-17T07:55:00.000Z",
    media: plate("photo-1474487548417-781cb71495f3", "A passenger train moving through open country"),
    body: `The announcement was printed in the same type as a platform change. That was the point. The railway did not want a festival. It wanted a 23:12.

The route was declared finished because the spreadsheet said so, and the spreadsheet was not wrong about the last decade. It was wrong about the next one: students who will not pay for a flight at dawn, and a ministry that finally priced the platform staff it had been pretending were optional.

Compartment 4 still smells like warm metal. The sandwich is cheese. A child asked if the train was old and was told, correctly, that it was repaired.

You can read the general idea of sleeper trains at [night train](https://en.wikipedia.org/wiki/Night_train). Then buy the cheese, if you are going.`,
  }),
  story({
    order: 10,
    featured: true,
    rank: 10,
    minutes: 5,
    slug: "the-tax-nobody-wants-to-own",
    headline: "Mayors trade notes on a tax nobody wants to own",
    dek: "It pays for the drains. It also ends careers. They met anyway.",
    summary: "Eight mayors compared how they explain a levy that keeps the drains working and the letters angry.",
    section: politics,
    byline: "Jonah Voss",
    published_at: "2026-11-16T19:25:00.000Z",
    media: plate("photo-1486406146926-c627a92ad1ab", "Glass towers reflecting a pale sky"),
    body: `They did not call it a summit. Eight mayors, a room with bad coffee, and a levy that everyone needs and nobody campaigns on.

The tax pays for drains, which is to say it pays for the absence of a photograph. When the drains work, there is no picture. When they fail, there is a career.

One mayor brought the letter she sends to households that ask why the line on the bill moved. It is four sentences. The third sentence is the only one that matters, and it contains a number and a street.

They left with copies. No communiqué. The drains do not require one.`,
  }),
  story({
    order: 11,
    featured: true,
    editors: true,
    minutes: 5,
    slug: "the-corner-shop-that-stayed",
    headline: "The corner shop that outlasted three delivery apps",
    dek: "The apps promised ten minutes. The shop promised Thursday's milk would be there on Thursday.",
    summary: "A corner shop kept its hours while three delivery apps arrived, rebranded, and left the postcode.",
    section: business,
    byline: "Samir Patel",
    published_at: "2026-11-16T17:40:00.000Z",
    media: plate("photo-1557804506-669a67965ba0", "People talking around a small table"),
    body: `The first app painted a bicycle on the window and called it a partnership. The second offered a tablet. The third sent a person with a clipboard and a smile that had a target on it.

The shop kept the same hours it has kept since the bus route changed in 2014. Milk on Thursday. A stool for the woman who reads the labels out loud. A book for the accounts that is actually a book.

All three apps have since left the postcode. The stool is still there. This is not a fable about virtue. It is a note about rent, a landlord who lives upstairs, and a decision not to turn the counter into a pickup shelf.

**Reliability is a product.** It just doesn't ping.`,
  }),
  story({
    order: 12,
    featured: true,
    minutes: 5,
    slug: "recipes-never-written-down",
    headline: "A chef, a radio, and the recipes that never got written down",
    dek: "She can tell you the dish. She will not give you the gram.",
    summary: "A late-night radio slot has become the only public copy of recipes a chef refuses to write down.",
    section: culture,
    byline: "Helen Cho",
    published_at: "2026-11-16T15:05:00.000Z",
    media: plate("photo-1460661419201-fd4cecdf8a8b", "Brushes and pigment spread across a studio table"),
    body: `The show starts at 22:30, which is late enough that the callers are serious. They do not ask for substitutions. They ask what she meant by "until it sounds ready".

She will describe the pan, the patience, the moment the onion goes quiet. She will not give a gram. A producer once tried to transcribe a recipe for the website and was asked, politely, to take it down.

The archive is the audio. That is the copy. Food historians would prefer a card. The listeners, who have cooked the dish badly and then well, prefer her voice telling them to wait.

There is a [history of recipe writing](https://en.wikipedia.org/wiki/Recipe) that wants everything measured. This show is the exception that proves the kitchen.`,
  }),
  story({
    order: 13,
    featured: true,
    minutes: 6,
    slug: "lights-low-for-the-moths",
    headline: "Why the lab kept the lights low for the moths",
    dek: "The experiment failed twice in bright rooms. The third room was almost a cupboard.",
    summary: "A moth study only started working when the lab agreed to work in a room the facilities team hated.",
    section: science,
    byline: "Leila Okonkwo",
    published_at: "2026-11-16T12:45:00.000Z",
    media: plate("photo-1532094349884-543bc11b234d", "Glassware on a laboratory bench"),
    body: `The first room had the correct temperature and the wrong ambition. It was bright because bright rooms look like science in photographs.

The moths did not care about the photograph. They stalled, or they flew to the exit sign, which is a sentence the paper will not include and the lab book does.

The third attempt happened in a room the facilities team described as a cupboard. The lights stayed low. The data, at last, behaved like data. A graduate student taped a note to the door: "If you need to see, you are in the wrong room."

It is still there. The note has a coffee ring, which the student has decided is part of the method.`,
  }),
  story({
    order: 14,
    featured: true,
    photo: true,
    minutes: 6,
    slug: "river-towns-redraw-the-map",
    headline: "River towns redraw the map, one flood line at a time",
    dek: "The new line is not a prediction. It is a memory with a pencil.",
    summary: "Three river towns are redrawing flood maps from watermarks, not from a model alone.",
    section: climate,
    byline: "Idris Bennett",
    published_at: "2026-11-16T10:20:00.000Z",
    media: plate("photo-1500382017468-9049fed747ef", "A green field under a wide sky"),
    body: `The official map still shows a line from a year the river has since ignored. In the church hall, a different map is being made out of pencil, photographs, and the height of a stain on a particular wall.

Three towns are doing this in parallel, sharing a method and refusing a logo. They are not against models. They are against a model that has not been in the cellar.

The new line will disappoint someone. Lines always do. It will also tell a buyer, a planner, and a family on the ground floor something the old line had become too polite to say.

Bring a pencil if you go. The watermark is the editor.`,
  }),
  story({
    order: 15,
    featured: true,
    minutes: 4,
    slug: "velodrome-at-six",
    headline: "Inside the velodrome at 6 a.m., before the noise",
    dek: "The wood sounds different when only four people are allowed to hear it.",
    summary: "A velodrome's early session is a study in wood, wheels, and the discipline of not talking.",
    section: sport,
    byline: "Nora Feld",
    published_at: "2026-11-16T06:05:00.000Z",
    media: plate("photo-1517649763962-0c623066027b", "A cyclist leaning into an empty stretch of road"),
    body: `At 06:00 the velodrome belongs to four riders and a mechanic who does not say good morning until the second effort. The wood has a sound, a soft tick, that disappears once the building fills.

They are not chasing a time that will be announced. They are chasing a line. The line is painted and also not painted: it is the path the wheel should take if the rider is telling the truth.

I was allowed to stand at the top and not ask questions. That was the whole interview. The mechanic nodded at 07:10, which I have decided to quote.`,
  }),
  story({
    order: 16,
    featured: true,
    editors: true,
    minutes: 6,
    slug: "a-border-market-new-hours",
    headline: "A border market learns a new set of opening hours",
    dek: "The gate moved by forty minutes. The tomatoes had opinions.",
    summary: "A border market is open again on a shifted clock, and the vendors have already priced the difference.",
    section: world,
    byline: "Ruth Keita",
    published_at: "2026-11-15T18:50:00.000Z",
    media: plate("photo-1488521787991-ed7bbaae773c", "People gathered outdoors in a busy square"),
    body: `The gate used to open at 07:00. It now opens at 07:40, for reasons that fit on a form and do not fit in a crate of tomatoes.

Vendors arrived at the old time anyway, because habits are a kind of infrastructure. The tomatoes sat. The price at 07:45 was not the price at 07:05, and everyone knew it without a meeting.

A new handwritten board has appeared by the north aisle: hours, and under them a smaller line, "crates do not tell time". It is a joke and a policy.

The border is a document. The market is a clock. This week the clock won a small argument and lost forty minutes.`,
  }),
  story({
    order: 17,
    featured: true,
    minutes: 5,
    slug: "paper-mills-again",
    headline: "Paper mills, again: the unfashionable boom",
    dek: "The machines are loud, hired, and slightly embarrassed to be news.",
    summary: "Paper mills are hiring again, quietly, as packaging and ballots refuse to become fully digital.",
    section: business,
    byline: "Samir Patel",
    published_at: "2026-11-15T16:15:00.000Z",
    media: plate("photo-1454165804606-c3d57bc86b40", "Hands working over notebooks on a desk"),
    body: `There is a boom that does not want a panel at a conference. It smells like wet fibre and shift coffee, and it is hiring.

Packaging refused to vanish. So did ballots, menus, and the particular form a hospital still wants on paper when the system has a mood. The mills that survived the last lecture about the paperless office are now running extra hours.

A manager in a mill town told me she does not need the word renaissance. She needs two more people who will learn the machine and stay past the first winter. The advert is on the gate, not on a platform.

Unfashionable is a market position. It pays on Fridays.`,
  }),
  story({
    order: 18,
    featured: true,
    minutes: 5,
    slug: "a-mural-for-a-summer",
    headline: "The mural was meant to last a summer. It lasted a decade.",
    dek: "The wall was temporary. The argument about it was not.",
    summary: "A mural with a one-season permit is still on the wall, and the city has stopped pretending otherwise.",
    section: culture,
    byline: "Helen Cho",
    published_at: "2026-11-15T13:35:00.000Z",
    media: plate("photo-1477959858617-67f85cf4f1df", "A dense city skyline in late light"),
    body: `The permit said October. The paint had other plans, and so did the street, which started giving directions by the mural instead of by the bank.

Every few years someone proposes a tasteful end. The proposals are always reasonable and always lose to a photograph of a child pointing at the fish, which is not even the best part of the wall but has become the part people defend.

The artist does not live in the city anymore. She asked, in a short note, that if they must paint over it they use a colour she would have chosen. The note is in the planning file, which is its own kind of frame.

A decade is a long summer. The wall seems fine with that.`,
  }),
  story({
    order: 19,
    featured: true,
    minutes: 6,
    slug: "a-field-that-changed-colour",
    headline: "A satellite, a farmer, and a field that changed colour",
    dek: "The image said stress. The farmer said thirst, and was more specific.",
    summary: "A satellite flagged a field, and the farmer's explanation was better than the algorithm's adjective.",
    section: science,
    byline: "Leila Okonkwo",
    published_at: "2026-11-15T11:00:00.000Z",
    media: plate("photo-1509391366360-2e959784a276", "Rows of solar panels in a bright field"),
    body: `The satellite product uses the word stress, which is what you say when you are not standing in the field. The farmer looked at the same colour and said the west edge had missed two waterings because a valve stuck on a Friday and nobody loves a Friday valve.

Both descriptions are data. Only one of them tells you where to put the wrench.

A graduate student has started keeping a second caption for every image: the adjective the model chose, and the noun the farmer used. The second column is shorter and more expensive to collect. It is also the one the co-op now asks for.

The field is green again. The valve has a piece of red tape on it, which is the most accurate sensor in the story.`,
  }),
  story({
    order: 20,
    featured: true,
    minutes: 4,
    slug: "read-slower",
    headline: "Read slower. The story is still the point.",
    dek: "Speed is a setting. Attention is the edition.",
    summary: "A case for reading the piece you opened, not the piece the counter wanted you to skim.",
    section: opinion,
    byline: "August Pell",
    published_at: "2026-11-15T08:30:00.000Z",
    media: plate("photo-1481627834876-b7833e8f5570", "Bookshelves in a quiet library"),
    body: `The counter in the corner of this site is honest about one thing: there are twenty stories on the desk tonight, and you will not read them all. Good. Nobody should.

What the counter cannot tell you is which sentence was the reason a reporter stayed an extra hour. That sentence is rarely in the first screen. It is usually where the number meets a name.

**Read one piece to the end.** Not as a virtue, as a method. The method is how you find out whether we earned the headline.

If you only have four minutes, you have enough. Start with the housing vote, or with [the corner shop](/article/the-corner-shop-that-stayed). Then stop. Stopping is part of editing, and you are allowed to be an editor of your own evening.`,
  }),
  story({
    order: 21,
    minutes: 4,
    slug: "committee-calendars",
    headline: "Committee calendars, and the week they slipped",
    dek: "The agenda was perfect. The week was not.",
    summary: "A committee's public calendar slipped by three sittings, and the interesting part is who noticed.",
    section: politics,
    byline: "Jonah Voss",
    published_at: "2026-11-18T16:10:00.000Z",
    media: null,
    body: `The calendar on the website still showed Tuesday. The committee had not sat on a Tuesday since the heating failed and the clerk made a decision that was sensible and undocumented.

Three sittings moved. The agenda did not, which meant the public record and the room diverged by a week. A reporter who covers the room, not the website, was the first to write the new dates on paper.

**This is a small story on purpose.** Small stories are how calendars become true again. The clerk has now pinned the revised sheet beside the old one, rather than over it, which is the correct way to correct a week.`,
  }),
  story({
    order: 22,
    minutes: 4,
    slug: "the-rehearsal-that-almost-didnt",
    headline: "Notes from a rehearsal that almost didn't happen",
    dek: "The hall was double-booked. The play was not.",
    summary: "A company rehearsed in a corridor when the hall was given to a quiz night, and the scene got better.",
    section: culture,
    byline: "Helen Cho",
    published_at: "2026-11-18T15:05:00.000Z",
    media: null,
    body: `The quiz night had a deposit. The company had a tradition. The tradition lost, which is how six actors ended up running a scene in a corridor that smells like floor varnish and coats.

They were annoyed for four minutes and then interested. The corridor made them stand closer. The line that had been dying at the back of the hall landed, because there was no back.

They will return to the stage on Friday. The director has asked them to remember the distance. Some notes should not be filmed. These were written on a call sheet, in the margin, where they belong.`,
  }),
  story({
    order: 23,
    minutes: 5,
    slug: "a-heat-plan-for-august",
    headline: "A heat plan written on the back of last August",
    dek: "The official plan is twelve pages. The useful one is a pencil list.",
    summary: "A neighbourhood heat plan that people actually use was written the week after the worst afternoon.",
    section: climate,
    byline: "Idris Bennett",
    published_at: "2026-11-18T14:20:00.000Z",
    media: null,
    body: `The twelve-page plan is not bad. It names the risk, the partners, the phone tree. It was written in April, when April still believed in itself.

The list people used in August was on the back of a flyer: which stairwell stays bearable, who has a key to the community room, which pharmacist will open if you knock with sense. It was written on a Wednesday by three people who had just lived the Tuesday.

I am not romantic about pencil. I am specific about it. The twelve pages have now absorbed the list, which is the first time the document and the stairwell agree.

If you are writing a plan, start with the afternoon you wish you had planned. Then type it up.`,
  }),
  story({
    order: 24,
    minutes: 4,
    slug: "the-goalkeeper-and-the-mail",
    headline: "The goalkeeper who started answering the mail",
    dek: "Not the abuse. The other letters, the ones with a return address.",
    summary: "A goalkeeper now answers a stack of letters each Monday, and the answers have become part of the fixture list.",
    section: sport,
    byline: "Nora Feld",
    published_at: "2026-11-18T12:15:00.000Z",
    media: plate("photo-1574629810360-7efbbe195018", "A football on a worn pitch"),
    body: `The club filters the mail, which is a sad sentence and a necessary one. What remains is smaller than the internet implies: children, a retired referee, a person who wants to know how to hold a cross on a wet evening.

On Mondays the goalkeeper sits in a room that is not glamorous and writes back. Not to all of them. To the ones with a question that can be answered in a page.

The letters do not make the saves better. They make the week specific. She says the referee's letter is the one she keeps in the bag, because he described a goal she had misremembered, and he was right.`,
  }),
  story({
    order: 25,
    minutes: 5,
    slug: "storm-season-on-the-desk",
    headline: "Insurance desks and the storm-season question",
    dek: "The question is no longer whether the roof was old. It is which year the policy thinks it is.",
    summary: "Insurance desks are rewriting the first question they ask after a storm, and customers can hear the edit.",
    section: business,
    byline: "Samir Patel",
    published_at: "2026-11-18T10:25:00.000Z",
    media: plate("photo-1497366216548-37526070297c", "An empty office washed in warm light"),
    body: `After the last storm, the first question on the script was about the age of the roof. It produced neat files and angry phone calls, because a roof's age is not the same thing as a roof's week.

A desk supervisor changed the script to start with a different question: what did the water do in the first hour? It is a worse question for a dropdown menu and a better question for a claim.

The new script is being tested in two regions. Early files are longer. They are also being paid with fewer appeals, which is the sort of metric that does not trend and should.

Storm season is a product design problem that happens to involve weather.`,
  }),
  story({
    order: 26,
    minutes: 4,
    slug: "ferry-captains-winter-timetable",
    headline: "Ferry captains on the winter timetable",
    dek: "The summer poster has been taken down. The winter one tells the truth.",
    summary: "Ferry captains have switched to the winter board, and the crossings are slower, published, and kept.",
    section: world,
    byline: "Mira Adelman",
    published_at: "2026-11-14T17:10:00.000Z",
    media: plate("photo-1436491865332-7a61a109cc05", "An aircraft wing above a layer of cloud"),
    body: `The summer timetable was a promise about daylight. The winter one is a promise about arriving.

Captains on this route publish a slower crossing from November and then keep it, which has become a minor point of pride and a major point of commerce. Freight managers would rather have a dull hour than a heroic delay.

The poster by the ticket window has the summer photograph and the winter hours, which is a small contradiction I am leaving in the piece because the clerk laughed about it and would not take the photograph down.

"People know which one to read," she said. They do.`,
  }),
  story({
    order: 27,
    minutes: 5,
    slug: "the-footnote-that-moved",
    headline: "The footnote that moved a whole paper",
    dek: "It was note 12. It should have been the abstract.",
    summary: "A footnote about a mislabelled sample forced a research group to rewrite the paper around it.",
    section: science,
    byline: "Leila Okonkwo",
    published_at: "2026-11-18T13:40:00.000Z",
    media: null,
    body: `Note 12 began as an apology to the method. A sample had been mislabelled in March and discovered in September, which is a long time for a label to be wrong and a short time, in science, to admit it.

The group could have corrected a paragraph. The postdoc who found the swap argued that the paragraph was the paper. She was right, which is inconvenient.

The rewrite is slower and better. The new abstract contains the sentence that used to hide at the bottom of the page. Readers who only read abstracts will, for once, meet the thing that mattered.

**Footnotes are not the basement.** Sometimes they are the door.`,
  }),
  story({
    order: 28,
    minutes: 4,
    slug: "readers-who-stayed",
    headline: "Letters from readers who stayed until the end",
    dek: "They did not write to agree. They wrote to continue.",
    summary: "A stack of reader letters argues, corrects, and stays past the last paragraph.",
    section: opinion,
    byline: "August Pell",
    published_at: "2026-11-14T12:00:00.000Z",
    media: plate("photo-1455390582262-044cdead277a", "A typewriter waiting on a wooden desk"),
    body: `The letters that arrive after a piece is finished are the second edition. Some correct a street name. Some are furious in complete sentences, which I respect. A few do the rare thing and add a fact we did not have.

I read them on paper when they are paper, and on a screen when they are not, but I answer the ones that could have been paper. That is an old bias and I am keeping it.

If you write to this desk, tell us the sentence you stayed for. It helps us see which lines are doing the work and which are only warming up.

The evening is better when someone stays until the end and then talks back.`,
  }),
  story({
    order: 29,
    minutes: 5,
    slug: "a-polite-argument-about-a-bridge",
    headline: "Cartographers argue, politely, about a new bridge",
    dek: "The bridge exists. The map is taking longer, on purpose.",
    summary: "Two mapping desks disagree about when a new bridge becomes a line, and the argument is the standard.",
    section: world,
    byline: "Ruth Keita",
    published_at: "2026-11-13T15:45:00.000Z",
    media: plate("photo-1524661135-423995f22d0b", "Railway tracks running toward a low sun"),
    body: `The bridge opened on a Saturday, with a ribbon the wind did not respect. On Monday the maps still showed a river without a crossing, which was accurate to the files and rude to the drivers.

One desk wants the line now. The other wants the line when the approaches are finished, because a bridge that strands you is not yet a route. They have exchanged four memos and no insults, which in cartography is a heated debate.

I walked the span. It is a bridge. It is also, for another month, a question. The map will answer later than the ribbon, and that delay is the product.

Draw it when it works both ways. That is the whole style guide.`,
  }),
  story({
    order: 30,
    minutes: 4,
    slug: "the-midnight-bookshop",
    headline: "The midnight bookshop on the tram line",
    dek: "It opens when the last tram is still deciding. It closes when the books say so.",
    summary: "A bookshop keeps midnight hours beside a tram stop, and the stock is whatever the night shift will actually read.",
    section: culture,
    byline: "Helen Cho",
    published_at: "2026-11-13T21:15:00.000Z",
    media: plate("photo-1524995997946-a1c2e315a42f", "A table buried under open books"),
    body: `The shop opens at 21:00 and does not pretend to be a concept. The owner works a day job in a museum cloakroom and spends the night selling the books the cloakroom made her want.

There is no membership. There is a lamp, a bell, and a rule that you may read the first chapter standing up. After that you are a customer or you are kind and you leave the corner free.

The tram drivers know the lamp. One of them buys the same series, slowly, which is the best review a shop can have.

Midnight is just an hour that had a vacancy. She filled it with paper.`,
  }),
  story({
    order: 31,
    minutes: 4,
    slug: "the-relay-in-the-rain",
    headline: "The relay they insisted on running in the rain",
    dek: "The meet could have moved indoors. The athletes asked it not to.",
    summary: "A junior relay was run in the rain at the athletes' request, and the time was not the point.",
    section: sport,
    byline: "Nora Feld",
    published_at: "2026-11-12T16:40:00.000Z",
    media: plate("photo-1540747913346-19e32dc3e97e", "A stadium caught under floodlights"),
    body: `The indoor track was available. It would have been drier, faster, and easier to put on a livestream. The four juniors asked to stay outside.

Their coach made them say why. They said the baton feels different in the rain, and they would rather learn it now than in a final they cannot reschedule. The official, who has seen worse reasons, agreed.

They did not run a time that will be printed on a poster. They ran four passes that worked, one that nearly didn't, and a last leg that looked like a person telling the truth.

I kept the result. I am leading with the request.`,
  }),
  story({
    order: 32,
    minutes: 5,
    slug: "salt-on-the-ledges",
    headline: "Salt on the window ledges, and a town taking notes",
    dek: "The sea is not at the door. It is in the dust. The town has started a ledger.",
    summary: "A coastal town is logging salt on window ledges as a measurement, not a mood.",
    section: climate,
    byline: "Idris Bennett",
    published_at: "2026-11-12T11:20:00.000Z",
    media: plate("photo-1507525428034-b723cf961d3e", "A quiet shoreline under a pale sky"),
    body: `You can taste it before you can see the water. On certain mornings the ledges on the west street go gritty, and the grit is salt, and the salt has a direction.

A teacher, a glazier, and a retired pilot have started a ledger. Date, street, how far up the glass, whether the tomatoes minded. It is not a peer-reviewed instrument. It is a record the council has agreed to receive, which is a different and useful status.

The sea is still a walk away. The ledger is how the walk gets shorter on paper before it gets shorter in fact.

Bring the ledger to the meeting. Leave the adjectives at home.`,
  }),
];
