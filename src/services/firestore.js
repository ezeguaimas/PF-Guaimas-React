import { initializeApp } from "firebase/app";
import { getFirestore, orderBy, collection, getDocs, doc, getDoc, query, where, addDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKu6QDub9-LEyRDQlk5c8Seva_6NoEKHU",
  authDomain: "pf-react-f2350.firebaseapp.com",
  projectId: "pf-react-f2350",
  storageBucket: "pf-react-f2350.appspot.com",
  messagingSenderId: "389255520943",
  appId: "1:389255520943:web:4692edf4733fcc55346a5a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getItems() {
  const productsRef = collection(db, "products");

  const q = query(productsRef, orderBy("index"));
  const productsSnap = await getDocs(q);
  const documents = productsSnap.docs;

  const docsData = documents.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return docsData;
}

export async function getSingleItem(idURL) {
  //referencia
  const docRef = doc(db, "products", idURL);
  //snapshot
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getItemsByCategory(categoryid) {
  const productsRef = collection(db, "products");

  /* Crear una consutlta A: productosREf  CUANDO se cumpla where( if( )) */
  const q = query(productsRef, where("category", "==", categoryid));

  const productsSnap = await getDocs(q);
  const documents = productsSnap.docs;

  const docsData = documents.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return docsData;
}

export async function createOrder(order) {
  const collectionOrdersRef = collection(db, "orders");
  const response = await addDoc(collectionOrdersRef, order);
  return response.id; // resolve(response.id)
}

export async function exportData() {
  const products = [
    {
        "id" : 1,
        "category" : "cerveza",
        "title" : "quilmes",
        "subcategory" : "lager",
        "contenido" : 354,
        "img" : "https://i.ibb.co/sWSzhRp/quilmes.png",
        "precio" : 200,
        "stock" : 10
    },
    {
        "id" : 2,
        "category" : "cerveza",
        "title" : "amstel",
        "subcategory" : "lager",
        "contenido" : 354,
        "img" : "https://i.ibb.co/9Z2TXvS/amstel.png",
        "precio" : 200,
        "stock" : 10
    },
    {
        "id" : 3,
        "category" : "cerveza",
        "title" : "imperial",
        "subcategory" : "lager",
        "contenido" : 473,
        "img" : "https://i.ibb.co/5YrnMRN/imperial.png",
        "precio" : 500,
        "stock" : 10
    },
    {
        "id" : 4,
        "category" : "cerveza",
        "title" : "corona",
        "subcategory" : "pilsen",
        "contenido" : 330,
        "img" : "https://i.ibb.co/NZ7Lwjn/corona.png",
        "precio" : 600,
        "stock" : 10
    },
    {
        "id" : 5,
        "category" : "cerveza",
        "title" : "salta",
        "subcategory" : "negra",
        "contenido" : 473,
        "img" : "https://i.ibb.co/V3nFfkK/salta.png",
        "precio" : 750,
        "stock" : 10
    },
    {
        "id" : 6,
        "category" : "vino",
        "title" : "cafayate",
        "subcategory" : "torrontes",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/Qbgqq2W/cafayate.png",
        "precio" : 450,
        "stock" : 10
    },
    {
        "id" : 7,
        "category" : "vino",
        "title" : "toro",
        "subcategory" : "tinto",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/Y4Cr7Pg/toro.png",
        "precio" : 400,
        "stock" : 10
    },
    {
        "id" : 8,
        "category" : "vino",
        "title" : "benjamin",
        "subcategory" : "rosado",
        "contenido" : 750,
        "img" : "https://i.ibb.co/XYMR4ZK/benjamin.png",
        "precio" : 1200,
        "stock" : 10
    },
    {
        "id" : 9,
        "category" : "vino",
        "title" : "santa julia",
        "subcategory" : "malbec",
        "contenido" : 750,
        "img" : "https://i.ibb.co/0j3pGgs/julia.png",
        "precio" : 1100,
        "stock" : 10
    },
    {
        "id" : 10,
        "category" : "vino",
        "title" : "amalaya",
        "subcategory" : "cabernet",
        "contenido" : 700,
        "img" : "https://i.ibb.co/JKHqf6g/amalaya.png",
        "precio" : 1800,
        "stock" : 10
    },
    {
        "id" : 11,
        "category" : "whisky",
        "title" : "chivas",
        "subcategory" : "scotch blend",
        "contenido" : 700,
        "img" : "https://i.ibb.co/jhsYhX3/chivas.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 12,
        "category" : "whisky",
        "title" : "ballantines",
        "subcategory" : "blended scotch",
        "contenido" : 750,
        "img" : "https://i.ibb.co/MV6RN3K/ballantines.png",
        "precio" : 5000,
        "stock" : 10
    },
    {
        "id" : 13,
        "category" : "whisky",
        "title" : "jack daniels",
        "subcategory" : "tennessee",
        "contenido" : 700,
        "img" : "https://i.ibb.co/n1PKxVD/jackdaniels.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 14,
        "category" : "whisky",
        "title" : "johnnie walker",
        "subcategory" : "red label",
        "contenido" : 700,
        "img" : "https://i.ibb.co/gJb9TX4/johnniewalker.png",
        "precio" : 9000,
        "stock" : 10
    },
    {
        "id" : 15,
        "category" : "whisky",
        "title" : "jim beam",
        "subcategory" : "black",
        "contenido" : 700,
        "img" : "https://i.ibb.co/2n2Ht3b/jimbeam.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 16,
        "category" : "aperitivo",
        "title" : "branca",
        "subcategory" : "fernet",
        "contenido" : 750,
        "img" : "https://i.ibb.co/CMpzSqk/branca.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 17,
        "category" : "aperitivo",
        "title" : "aperol",
        "subcategory" : "spritz",
        "contenido" : 750,
        "img" : "https://i.ibb.co/7j1L228/aperol.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 18,
        "category" : "aperitivo",
        "title" : "gancia",
        "subcategory" : "americano",
        "contenido" : 750,
        "img" : "https://i.ibb.co/Df3rXbS/gancia.png",
        "precio" : 1200,
        "stock" : 10
    },
    {
        "id" : 19,
        "category" : "aperitivo",
        "title" : "campari",
        "subcategory" : "clasico",
        "contenido" : 750,
        "img" : "https://i.ibb.co/48Hk3YW/campari.png",
        "precio" : 1500,
        "stock" : 10
    },
    {
        "id" : 20,
        "category" : "aperitivo",
        "title" : "martini",
        "subcategory" : "bianco",
        "contenido" : 750,
        "img" : "https://i.ibb.co/Bj2WP0j/martini.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 21,
        "category" : "destilado",
        "title" : "bombay",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/BKdS9cv/bombay.png",
        "precio" : 7000,
        "stock" : 10
    },
    {
        "id" : 22,
        "category" : "destilado",
        "title" : "tanqueray",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/mhCBRH8/tanqueray.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 23,
        "category" : "destilado",
        "title" : "beefeater",
        "subcategory" : "london dry gin",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/0DLhDj2/beefeater.png",
        "precio" : 7000,
        "stock" : 10
    },
    {
        "id" : 24,
        "category" : "destilado",
        "title" : "gordons",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/RPKThxJ/gordons.png",
        "precio" : 3000,
        "stock" : 10
    },
    {
        "id" : 25,
        "category" : "destilado",
        "title" : "bosque",
        "subcategory" : "craft gin",
        "contenido" : 500,
        "img" : "https://i.ibb.co/5RZhMw3/bosque.png",
        "precio" : 3000,
        "stock" : 10
    }
];

  const collectionRef = collection(db, "products");

  /* products.forEach( item => {...}) */
  for (let item of products) {
    item.index = item.id;
    delete item.id;
    const response = await addDoc(collectionRef, item);
    console.log("producto exportado con ID: " + response.id);
  }
}

export async function exportDataWithBatch() {
  const products = [
    {
        "id" : 1,
        "category" : "cerveza",
        "title" : "quilmes",
        "subcategory" : "lager",
        "contenido" : 354,
        "img" : "https://i.ibb.co/sWSzhRp/quilmes.png",
        "precio" : 200,
        "stock" : 10
    },
    {
        "id" : 2,
        "category" : "cerveza",
        "title" : "amstel",
        "subcategory" : "lager",
        "contenido" : 354,
        "img" : "https://i.ibb.co/9Z2TXvS/amstel.png",
        "precio" : 200,
        "stock" : 10
    },
    {
        "id" : 3,
        "category" : "cerveza",
        "title" : "imperial",
        "subcategory" : "lager",
        "contenido" : 473,
        "img" : "https://i.ibb.co/5YrnMRN/imperial.png",
        "precio" : 500,
        "stock" : 10
    },
    {
        "id" : 4,
        "category" : "cerveza",
        "title" : "corona",
        "subcategory" : "pilsen",
        "contenido" : 330,
        "img" : "https://i.ibb.co/NZ7Lwjn/corona.png",
        "precio" : 600,
        "stock" : 10
    },
    {
        "id" : 5,
        "category" : "cerveza",
        "title" : "salta",
        "subcategory" : "negra",
        "contenido" : 473,
        "img" : "https://i.ibb.co/V3nFfkK/salta.png",
        "precio" : 750,
        "stock" : 10
    },
    {
        "id" : 6,
        "category" : "vino",
        "title" : "cafayate",
        "subcategory" : "torrontes",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/Qbgqq2W/cafayate.png",
        "precio" : 450,
        "stock" : 10
    },
    {
        "id" : 7,
        "category" : "vino",
        "title" : "toro",
        "subcategory" : "tinto",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/Y4Cr7Pg/toro.png",
        "precio" : 400,
        "stock" : 10
    },
    {
        "id" : 8,
        "category" : "vino",
        "title" : "benjamin",
        "subcategory" : "rosado",
        "contenido" : 750,
        "img" : "https://i.ibb.co/XYMR4ZK/benjamin.png",
        "precio" : 1200,
        "stock" : 10
    },
    {
        "id" : 9,
        "category" : "vino",
        "title" : "santa julia",
        "subcategory" : "malbec",
        "contenido" : 750,
        "img" : "https://i.ibb.co/0j3pGgs/julia.png",
        "precio" : 1100,
        "stock" : 10
    },
    {
        "id" : 10,
        "category" : "vino",
        "title" : "amalaya",
        "subcategory" : "cabernet",
        "contenido" : 700,
        "img" : "https://i.ibb.co/JKHqf6g/amalaya.png",
        "precio" : 1800,
        "stock" : 10
    },
    {
        "id" : 11,
        "category" : "whisky",
        "title" : "chivas",
        "subcategory" : "scotch blend",
        "contenido" : 700,
        "img" : "https://i.ibb.co/jhsYhX3/chivas.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 12,
        "category" : "whisky",
        "title" : "ballantines",
        "subcategory" : "blended scotch",
        "contenido" : 750,
        "img" : "https://i.ibb.co/MV6RN3K/ballantines.png",
        "precio" : 5000,
        "stock" : 10
    },
    {
        "id" : 13,
        "category" : "whisky",
        "title" : "jack daniels",
        "subcategory" : "tennessee",
        "contenido" : 700,
        "img" : "https://i.ibb.co/n1PKxVD/jackdaniels.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 14,
        "category" : "whisky",
        "title" : "johnnie walker",
        "subcategory" : "red label",
        "contenido" : 700,
        "img" : "https://i.ibb.co/gJb9TX4/johnniewalker.png",
        "precio" : 9000,
        "stock" : 10
    },
    {
        "id" : 15,
        "category" : "whisky",
        "title" : "jim beam",
        "subcategory" : "black",
        "contenido" : 700,
        "img" : "https://i.ibb.co/2n2Ht3b/jimbeam.png",
        "precio" : 6000,
        "stock" : 10
    },
    {
        "id" : 16,
        "category" : "aperitivo",
        "title" : "branca",
        "subcategory" : "fernet",
        "contenido" : 750,
        "img" : "https://i.ibb.co/CMpzSqk/branca.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 17,
        "category" : "aperitivo",
        "title" : "aperol",
        "subcategory" : "spritz",
        "contenido" : 750,
        "img" : "https://i.ibb.co/7j1L228/aperol.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 18,
        "category" : "aperitivo",
        "title" : "gancia",
        "subcategory" : "americano",
        "contenido" : 750,
        "img" : "https://i.ibb.co/Df3rXbS/gancia.png",
        "precio" : 1200,
        "stock" : 10
    },
    {
        "id" : 19,
        "category" : "aperitivo",
        "title" : "campari",
        "subcategory" : "clasico",
        "contenido" : 750,
        "img" : "https://i.ibb.co/48Hk3YW/campari.png",
        "precio" : 1500,
        "stock" : 10
    },
    {
        "id" : 20,
        "category" : "aperitivo",
        "title" : "martini",
        "subcategory" : "bianco",
        "contenido" : 750,
        "img" : "https://i.ibb.co/Bj2WP0j/martini.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 21,
        "category" : "destilado",
        "title" : "bombay",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/BKdS9cv/bombay.png",
        "precio" : 7000,
        "stock" : 10
    },
    {
        "id" : 22,
        "category" : "destilado",
        "title" : "tanqueray",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/mhCBRH8/tanqueray.png",
        "precio" : 1600,
        "stock" : 10
    },
    {
        "id" : 23,
        "category" : "destilado",
        "title" : "beefeater",
        "subcategory" : "london dry gin",
        "contenido" : 1000,
        "img" : "https://i.ibb.co/0DLhDj2/beefeater.png",
        "precio" : 7000,
        "stock" : 10
    },
    {
        "id" : 24,
        "category" : "destilado",
        "title" : "gordons",
        "subcategory" : "london dry gin",
        "contenido" : 750,
        "img" : "https://i.ibb.co/RPKThxJ/gordons.png",
        "precio" : 3000,
        "stock" : 10
    },
    {
        "id" : 25,
        "category" : "destilado",
        "title" : "bosque",
        "subcategory" : "craft gin",
        "contenido" : 500,
        "img" : "https://i.ibb.co/5RZhMw3/bosque.png",
        "precio" : 3000,
        "stock" : 10
    }
];

  const collectionRef = collection(db, "products");
  const batch = writeBatch(db);

  for (let item of products) {
    item.index = item.id;
    delete item.id;
    const newDoc = doc(collectionRef);

    batch.set(newDoc, item);
  }

  await batch.commit();
}
