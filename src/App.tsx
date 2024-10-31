import  { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [verse, setVerse] = useState({
    text: "",
    translation: "",
    transliteration: ""
  });
  const [hadith, setHadith] = useState<{ arabic: string; english: string; reference: string } | null>(null);
  const [isverseGenerated, setisverseGenerated] = useState(false);
  const [ishadithGenerated, setishadithGenerated] = useState(false);

  const hadithArray = [
      {
        arabic: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.",
        english: "Actions are judged by intentions, so each person will get what they intended.",
        reference: "Sahih al-Bukhari 1"
      },
      {
        arabic: "خيركم من أكرم أهله.",
        english: "The best among you are those who have the best manners and character.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "طلب العلم فريضة على كل مسلم.",
        english: "The seeking of knowledge is obligatory for every Muslim.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
        english: "None of you truly believes until he loves for his brother what he loves for himself.",
        reference: "Sahih al-Bukhari 13"
      },
      {
        arabic: "من دل على خير فله مثل أجر فاعله.",
        english: "Whoever guides someone to goodness will have a reward like one who did it.",
        reference: "Sahih Muslim 1893"
      },
      {
        arabic: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير.",
        english: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.",
        reference: "Sahih Muslim 2664"
      },
      {
        arabic: "اللسان شريف، إذا أطلقته هلك.",
        english: "The tongue is a beast; if it is let loose, it devours.",
        reference: "Sunan Abi Dawood 4864"
      },
      {
        arabic: "ما نقصت صدقة من مال.",
        english: "Charity does not decrease wealth.",
        reference: "Sahih Muslim 2588"
      },
      {
        arabic: "أفضل الناس أنفعهم للناس.",
        english: "The best of people are those that bring the most benefit to the rest of mankind.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "لا تغضب، تدخل الجنة.",
        english: "Do not be angry, and you will enter Paradise.",
        reference: "Sunan Abi Dawood 4777"
      },
      {
        arabic: "خيركم خيركم لأهله، وأنا خيركم لأهلي.",
        english: "The best of you are those who are best to their families.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "من لا يرحم صغيرنا ويوقر كبيرنا فليس منا.",
        english: "He who does not show mercy to our young or honor our elders is not one of us.",
        reference: "Sunan Abi Dawood 4943"
      },
      {
        arabic: "طلب العلم عبادة.",
        english: "Seeking knowledge is a form of worship.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "أحب الأعمال إلى الله أدومها وإن قل.",
        english: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
        reference: "Sahih Muslim 86"
      },
      {
        arabic: "المسلم من سلم المسلمون من لسانه ويده.",
        english: "A Muslim is the one from whose tongue and hand the people are safe.",
        reference: "Sahih al-Bukhari 10"
      },
      {
        arabic: "من لا يحضر جنازة مسلم إلا قليلاً، لا يعتبر من الجماعة.",
        english: "The one who does not attend the funeral of a Muslim, except for a few times, will not be considered among the community.",
        reference: "Sahih Muslim 942"
      },
      {
        arabic: "المسلم أخو المسلم، لا يظلمه ولا يخذله.",
        english: "The Muslim is the brother of another Muslim. He does not oppress him, nor does he abandon him.",
        reference: "Sahih Muslim 2564"
      },
      {
        arabic: "لا تحاسدوا، ولا تباغضوا، ولا تدابروا.",
        english: "Do not envy one another, do not hate one another, and do not turn away from one another.",
        reference: "Sahih Muslim 2566"
      },
      {
        arabic: "الراحمون يرحمهم الرحمن.",
        english: "The merciful are shown mercy by the Merciful.",
        reference: "Sunan Abi Dawood 4941"
      },
      {
        arabic: "أفضل الصدقة أن تسقي ماءً.",
        english: "The best charity is to give water.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "من أتى عرافاً فسأله عن شيء، لم تقبل له صلاة أربعين ليلة.",
        english: "Whoever goes to a fortune-teller and asks him about something, his prayers will not be accepted for forty nights.",
        reference: "Sahih Muslim 2230"
      },
      {
        arabic: "ما أكرم أحدكم أحداً إلا أكرمه الله.",
        english: "Whoever honors another, Allah will honor him.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "في الجنة مائة درجة، أعدها الله للمجاهدين في سبيله.",
        english: "In Paradise, there are a hundred levels, which Allah has prepared for the Mujahideen (those who strive) in His cause.",
        reference: "Sahih al-Bukhari 2784"
      },
      {
        arabic: "استوصوا بالنساء خيراً.",
        english: "Treat women kindly.",
        reference: "Sahih al-Bukhari 3153"
      },
      {
        arabic: "أحبوا الله لما يغذوكم من نعمه.",
        english: "Love Allah for the bounties He has provided you.",
        reference: "Sahih al-Bukhari 6502"
      },
      {
        arabic: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.",
        english: "Indeed, Allah does not look at your appearances or your wealth, but He looks at your hearts and your deeds.",
        reference: "Sahih Muslim 2564"
      },
      {
        arabic: "من لا يسأل الله، يغضب عليه.",
        english: "Whoever does not ask Allah, He becomes angry with him.",
        reference: "Sunan Ibn Majah 225"
      },
      {
        arabic: "أحب الأعمال إلى الله الصلاة على وقتها.",
        english: "The most beloved deed to Allah is the prayer offered at its proper time.",
        reference: "Sahih al-Bukhari 527"
      },
      {
        arabic: "من لا يشكر الناس لا يشكر الله.",
        english: "Whoever does not thank people, does not thank Allah.",
        reference: "Sunan Abi Dawood 4811"
      },
      {
        arabic: "أكثروا من الصلاة علي يوم الجمعة.",
        english: "Increase your prayers upon me on the day of Friday.",
        reference: "Sunan Abi Dawood 1047"
      },
      {
        arabic: "كل معروف صدقة.",
        english: "Every act of kindness is charity.",
        reference: "Sahih Muslim 1009"
      },
      {
        arabic: "إنما الصبر عند الصدمة الأولى.",
        english: "Patience is only at the first shock.",
        reference: "Sahih al-Bukhari 1284"
      },
      {
        arabic: "من لم يكن في عونه عوناً، لا يوفقه الله.",
        english: "He who does not help others, Allah will not help him.",
        reference: "Sunan Ibn Majah 225"
      },
      {
        arabic: "اتقوا النار ولو بشق تمرة.",
        english: "Fear the Fire, even if it is by giving half a date in charity.",
        reference: "Sahih al-Bukhari 654"
      },
      {
        arabic: "أحب إلي من الدنيا ما فيه.",
        english: "What I love most about the world is the remembrance of Allah.",
        reference: "Sunan Ibn Majah 225"
      },
      {
        arabic: "لا تتمنوا لقاء العدو، واسألوا الله العافية.",
        english: "Do not wish for an encounter with the enemy, and ask Allah for safety.",
        reference: "Sahih al-Bukhari 2790"
      },
      {
        arabic: "المسلم من سلم المسلمون من لسانه ويده.",
        english: "A Muslim is one from whose tongue and hand the Muslims are safe.",
        reference: "Sahih al-Bukhari 10"
      },
      {
        arabic: "من استمع إلى حديث قوم وهم له كارهون، صب في أذنه الآنك يوم القيامة.",
        english: "Whoever listens to the conversation of a people while they dislike it, molten lead will be poured into his ears on the Day of Resurrection.",
        reference: "Sahih al-Bukhari 6130"
      },
      {
        arabic: "أحب الناس إلى الله أنفعهم للناس.",
        english: "The most beloved of people to Allah are those who are most beneficial to people.",
        reference: "Sunan al-Kubra 20918"
      },
      {
        arabic: "إن الله طيب لا يقبل إلا طيبًا.",
        english: "Indeed, Allah is Good and accepts only that which is good.",
        reference: "Sahih Muslim 1015"
      },
      {
        arabic: "من حسن إسلام المرء تركه ما لا يعنيه.",
        english: "Part of the perfection of one’s Islam is his leaving that which does not concern him.",
        reference: "Sunan Abi Dawood 4860"
      },
      {
        arabic: "القلوب جنود مجندة.",
        english: "Hearts are like soldiers, they follow one another.",
        reference: "Sahih Muslim 2639"
      },
      {
        arabic: "أكثر من ذكر الله، فإن ذكر الله حياة القلب.",
        english: "Increase the remembrance of Allah, for it is the life of the heart.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "إن الله يرسل الملائكة على أقوام يذكرون الله.",
        english: "Indeed, Allah sends angels upon a people who remember Him.",
        reference: "Sahih Muslim 2616"
      },
      {
        arabic: "لا تدخلوا الجنة حتى تؤمنوا.",
        english: "You will not enter Paradise until you believe.",
        reference: "Sahih Muslim 44"
      },
      {
        arabic: "العلماء ورثة الأنبياء.",
        english: "The scholars are the inheritors of the Prophets.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "إن من أحبكم إلي وأقربكم مني يوم القيامة، أحاسنكم أخلاقًا.",
        english: "The most beloved and closest of you to me on the Day of Resurrection are those with the best character.",
        reference: "Sunan al-Tirmidhi 2616"
      },
      {
        arabic: "من سلك طريقًا يلتمس فيه علمًا، سهل الله له طريقًا إلى الجنة.",
        english: "Whoever follows a path to seek knowledge, Allah makes easy for him a path to Paradise.",
        reference: "Sunan Abu Dawood 3634"
      },
      {
        arabic: "من غشنا فليس منا.",
        english: "Whoever deceives us is not one of us.",
        reference: "Sahih Muslim 102"
      },
      {
        arabic: "من لم يرحم صغيرنا، ولم يوقر كبيرنا، فليس منا.",
        english: "He who does not show mercy to our young or honor our elders is not one of us.",
        reference: "Sunan Abi Dawood 4943"
      },
      {
        arabic: "كفى بالمرء كذبا أن يحدث بكل ما سمع.",
        english: "It is enough for a person to be considered a liar that he narrates everything he hears.",
        reference: "Sahih Muslim 5"
      },
      {
        arabic: "إن أكرمكم عند الله أتقاكم.",
        english: "Indeed, the most honorable of you in the sight of Allah is the one who is the most righteous.",
        reference: "Sahih al-Bukhari 6765"
      },
      {
        arabic: "الذي لا يقضى قضاءً فيه ما يقضى فإنما هو من أعظم الذنوب.",
        english: "He who is not given justice will bear the greatest sins.",
        reference: "Sunan al-Tirmidhi 2021"
      },
      {
        arabic: "الدعاء هو العبادة.",
        english: "Supplication is the essence of worship.",
        reference: "Sunan al-Tirmidhi 3479"
      },
      {
        arabic: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.",
        english: "Indeed, Allah does not look at your appearances or your wealth, but He looks at your hearts and your deeds.",
        reference: "Sahih Muslim 2564"
      },
      {
        arabic: "إذا جاءكم من ترضون دينه وخلقه فزوجوه.",
        english: "If a man comes to you whose religion and character you are pleased with, marry him off.",
        reference: "Sunan al-Tirmidhi 1084"
      },
      {
        arabic: "من أذنب ذنبًا فليستغفر الله.",
        english: "Whoever commits a sin should seek forgiveness from Allah.",
        reference: "Sunan Abi Dawood 4860"
      },
      {
        arabic: "كل بني آدم خطاء، وخير الخطائين التوابون.",
        english: "All sons of Adam are sinners, and the best of sinners are those who repent.",
        reference: "Sunan Ibn Majah 4247"
      },
      {
        arabic: "احفظ الله يحفظك.",
        english: "Preserve Allah’s rights, and He will preserve you.",
        reference: "Sunan al-Tirmidhi 2616"
      },
      {
        arabic: "جددوا إيمانكم.",
        english: "Renew your faith.",
        reference: "Sahih Muslim 55"
      },
      {
        arabic: "من لا يحبنا، ليس منا.",
        english: "Whoever does not love us is not one of us.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "إن في الجسد مضغة، إذا صلحت صلح الجسد كله.",
        english: "Indeed, there is a piece of flesh in the body. If it is sound, the whole body is sound.",
        reference: "Sahih al-Bukhari 52"
      },
      {
        arabic: "أحبوا الله لما يغذوكم من نعمه.",
        english: "Love Allah for the bounties He has provided you.",
        reference: "Sahih al-Bukhari 6502"
      },
      {
        arabic: "أفشوا السلام بينكم.",
        english: "Spread peace among yourselves.",
        reference: "Sahih Muslim 54"
      },
      {
        arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
        english: "None of you truly believes until he loves for his brother what he loves for himself.",
        reference: "Sahih al-Bukhari 13"
      },
      {
        arabic: "الأعمال بالنيات.",
        english: "Actions are judged by intentions.",
        reference: "Sahih al-Bukhari 1"
      },
      {
        arabic: "لا يغضب الله على عبده وهو لا يعبد غيره.",
        english: "Allah does not become angry with His servant as long as he worships no one besides Him.",
        reference: "Sunan Ibn Majah 224"
      },
      {
        arabic: "من دعى إلى هدى كان له من الأجر مثل أجور من تبعه.",
        english: "Whoever invites to guidance will have a reward similar to those who follow him.",
        reference: "Sahih Muslim 2674"
      },
      {
        arabic: "لا تحقرن من المعروف شيئًا.",
        english: "Do not belittle any good deed.",
        reference: "Sahih Muslim 2626"
      },
      {
        arabic: "التؤدة في الأمر.",
        english: "Moderation in affairs is important.",
        reference: "Sunan Abi Dawood 3935"
      },
      {
        arabic: "إن العبد ليؤمن بلسانه، ولا يصدق بقلبه.",
        english: "A servant may profess faith with his tongue, yet his heart does not confirm it.",
        reference: "Sahih al-Bukhari 62"
      },
      {
        arabic: "المسلم من سلم المسلمون من لسانه ويده.",
        english: "The Muslim is the one from whose hand and tongue other Muslims are safe.",
        reference: "Sahih al-Bukhari 10"
      },
      {
        arabic: "من لا يشكر الناس لا يشكر الله.",
        english: "Whoever does not thank people, does not thank Allah.",
        reference: "Sunan Abi Dawood 4811"
      }
    ];
    

  const generateVerse = async () => {
    try {
      const response = await axios.get("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json");
      const data = response.data;

      const randomChapterIndex = Math.floor(Math.random() * data.length);
      const randomChapter = data[randomChapterIndex];

      const randomVerseIndex = Math.floor(Math.random() * randomChapter.verses.length);
      const randomVerse = randomChapter.verses[randomVerseIndex];

      if (randomVerse && randomVerse.text && randomVerse.translation) {
        setVerse({
          text: randomVerse.text,
          translation: randomVerse.translation,
          transliteration: randomChapter.transliteration || "Transliteration not available"
        });
        setisverseGenerated(true);
      } else {
        console.error("Verse properties missing");
        setVerse({
          text: "Verse not available.",
          translation: "",
          transliteration: ""
        });
      }
    } catch (error) {
      console.error("Error fetching verse data:", error);
      setVerse({
        text: "Error loading verse.",
        translation: "",
        transliteration: ""
      });
    }
  };

  const generateHadith = () => {
    const randomIndex = Math.floor(Math.random() * hadithArray.length);
    const selectedHadith = hadithArray[randomIndex];
    setHadith(selectedHadith);
    setishadithGenerated(true);
  };

  return (
    <div>
      <h1>Quran and Hadith Generator</h1>
      <h1>﷽</h1>
      {isverseGenerated ? (
        <div>
          <p>{verse.transliteration}</p>
          <p>{verse.text}</p>
          <p>{verse.translation}</p>
        </div>
      ) : null}
      <div className="container">
        <button onClick={generateVerse}>Generate Verse</button>
      </div>

      <div>
        <h1>Hadith</h1>
        {ishadithGenerated && hadith ? (
          <div>
            <p><strong></strong> {hadith.arabic}</p>
            <p><strong></strong> {hadith.english}</p>
            <p><strong></strong> {hadith.reference}</p>
          </div>
        ) : null}
        <div className="container">
          <button onClick={generateHadith}>Generate Hadith</button>
        </div>
      </div>
    </div>
  );
}

export default App;
