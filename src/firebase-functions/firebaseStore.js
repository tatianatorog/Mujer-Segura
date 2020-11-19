import * as firebase from 'firebase';

export const db = firebase.firestore();

export const userSave = user => db.collection('users').doc(user.id).set(user);

export const createUserProfile = async () => {
  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.user.uid;

  return db.collection('users').where('id', '==', userId).get();
};

export const updateUserInfo = async user => db.collection('users').doc(user.id).update(user);

// Creamos el post en firebase con su colecciones y el objeto del doc
export const savePost = ( uid, name, userPhoto, title, description, typeOfFood, price, quality,location , foodPhoto ) => db.collection('review').doc().set({
  uid,
  name,
  userPhoto,
  title, 
  description,
  typeOfFood,
  price,
  quality,
  location,
  foodPhoto,
});


// De mi colección de reviews traeme todo
export const getPosts = () => db.collection('review').get();

/* Cada vez que mis posts se actualicen, agreguen o borren, actualizar en tiempo real
el timeline con el método onSnapshot() */
export const onGetPosts = callback => db.collection('review').onSnapshot(callback);

// Para eliminar un post necesito su id
export const deletePost = id => db.collection('review').doc(id).delete();
console.log(deletePost)
// Editar el post con su respectivo id
export const getEditPost = id => db.collection('review').doc(id).get();

// Actualizar la tarea, con los datos del id que me esta pasando la const
export const updatePost = (id, updatePost) => db.collection('review').doc(id).update(updatePost);


export const uploadImgFood = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`)
  const task = refStorage.put(file)

  task.on(
    'state_changed',
    snapshot => {
      const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
      console.log(porcentaje)
    },
    err => {
      console.log(err)
    },
    () => {
      task.snapshot.ref
        .getDownloadURL()
        .then(url => {
          localStorage.setItem('imgNewPost', url)
        })
        .catch(err => {
          console.log('err')
        })
    }
  )
}
