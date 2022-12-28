
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';

import db from '../../../firebase/config';

const CommentsScreen = ({ route }) => {
  const { userId, name, avatar } = useSelector(state => state.auth);
  const { postId, photo, allComments } = route.params;

  const [comments, setComments] = useState(allComments || []);
  const [newComment, setNewComment] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const createComment = async () => {
    const createdAt = new Date().toLocaleString('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    newComment.trim() &&
      (await db
        .firestore()
        .collection('posts')
        .doc(postId)
        .update({
          comments: [
            ...comments,
            {
              newComment,
              name,
              avatar: avatar ? avatar : null,
              userId,
              createdAt,
            },
          ],
        }));

    const data = await db.firestore().collection('posts').doc(postId).get();
    setComments(data.data().comments);

    keyboardHide();
    setNewComment('');
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.postImageContainer}>
          <Image style={styles.postImage} source={{ uri: photo }} />
        </View>
      </TouchableWithoutFeedback>
      {comments && (
        <SafeAreaView style={styles.commentsListContainer}>
          <FlatList
            data={comments}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => {
              const currentUser = userId === item.userId;
              return (
                <TouchableWithoutFeedback onPress={keyboardHide}>
                  <View
                    style={{
                      ...styles.commentContainer,
                      flexDirection: currentUser ? 'row-reverse' : 'row',
                    }}
                  >
                    <View
                      style={{
                        ...styles.comment,
                        borderTopLeftRadius: currentUser ? 20 : 0,
                        borderTopRightRadius: currentUser ? 0 : 20,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.commentAuthor,
                          textAlign: currentUser ? 'right' : 'left',
                        }}
                      >
                        {currentUser ? 'You' : item.name}
                      </Text>
                      <Text style={styles.commentMessage}>{item.newComment}</Text>
                      <Text
                        style={{
                          ...styles.commentDate,
                          textAlign: currentUser ? 'left' : 'right',
                        }}
                      >
                        {item.createdAt}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </SafeAreaView>
      )}
      <View
        style={{
          ...styles.inputWrapper,
          marginBottom: isShowKeyboard ? 100 : 20,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          onFocus={() => setIsShowKeyboard(true)}
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addCommentBtn} activeOpacity={0.7} onPress={createComment}>
          <Octicons name="arrow-up" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  postImageContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  commentsListContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  commentContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  comment: {
    padding: 14,
    maxWidth: 270,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  commentAuthor: {
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
    fontSize: 11,
    color: '#656565',
  },
  commentMessage: {
    marginBottom: 5,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#212121',
  },
  commentDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
  },
  inputWrapper: {
    position: 'relative',
    marginHorizontal: 16,
  },
  input: {
    justifyContent: 'center',
    height: 50,
    paddingLeft: 14,
    paddingRight: 55,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  addCommentBtn: {
    position: 'absolute',
    right: 6,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
  },
});