import styles from "./Card.module.css";

export function Card({
  titolo = "",
  contenuto = "",
  categoria = "",
  immagine = "",
  callbackCestina,
  arrayTags = [],
}) {

  let arraySpanTags =[];
  // Devo fare un map di questo array tags craendo un array di span
  if (arrayTags) {
   arraySpanTags = arrayTags.map((currTag, currIndex) => (
      <span key={currIndex}>{currTag}</span>
    ));
  }
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{titolo}</h2>
      <img src={immagine} alt="" className={styles.image} />
      <p className={styles.content}>{contenuto}</p>
      <h4 className={styles.category}>{categoria}</h4>
      <div className={styles.tags}>
        {arraySpanTags && arraySpanTags.map((tag) => (
          <span className={styles.tag}>{tag}</span>
        ))}
      </div>
      <div>
        <button onClick={callbackCestina} className={styles.button}>
          Cestina
        </button>
      </div>
    </div>
  );
}
