import React, {useState, useEffect} from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Picker = ({data, onSelectItem, defaultValue, selectedValueContainerStyles = {}, selectedValueTextStyles = {}}) => {
  const [isShowPicker, setIsShowPicker] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const styles = StyleSheet.create({
    modalList: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
      height: '100%',
      backgroundColor: '#fff',
    },
    modalListContainer: {
      backgroundColor: 'rgba(0,0,0,.7)',
      padding: 20,
    },
    modalListItem: {
      borderTopWidth: 1,
      paddingHorizontal:20,
      paddingVertical:14,
      borderColor: '#ddd'
    },
    selectedValueContainer: {
      ...selectedValueContainerStyles
    },
    selectedValueText: {
      ...selectedValueTextStyles
    }
  })

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, []);

  const isLastData = index => {
    return data.length === index + 1
  }

  const ListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={isLastData(index) ? {...styles.modalListItem, borderBottomWidth: 1} : styles.modalListItem}
        onPress={() => {
          onSelectItem(item.id);
          setSelectedValue(item.value)
          setIsShowPicker(false);
        }}
        activeOpacity={1}
      >
        <Text>{item.value}</Text>
      </TouchableOpacity>
    )
  }

  const ModalComponent = () => {
    return (
      <Modal>
        <SafeAreaView>
          <View style={styles.modalListContainer}>
            <FlatList
              style={styles.modalList}
              data={data}
              keyExtractor={item => item.id }
              renderItem = {({item, index}) =>
                <ListItem item={item} index={index} />
              }
            />
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  const SelectedItem = () => {
    return (
      <TouchableOpacity
        onPress={() => setIsShowPicker(true)}
        style={styles.selectedValueContainer}
      >
        <Text
          style={styles.selectedValueText}
        >
          {selectedValue}
        </Text>
      </TouchableOpacity>
    )
  }

  return isShowPicker ? <ModalComponent /> : <SelectedItem />
}


export default Picker;

