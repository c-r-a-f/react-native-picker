import React, { useState } from 'react'
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const Picker = ({
  data,
  onSelectItem,
  defaultValue,
  selectedValueContainerStyles,
  selectedValueTextStyles,
  backdropColor,
  listBackgroundColor,
  listItemFontSize,
  listItemBorderColor,
}) => {
  const [isShowPicker, setIsShowPicker] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const styles = StyleSheet.create({
    modalList: {
      borderBottomWidth: 1,
      borderColor: listItemBorderColor,
      height: '100%',
      backgroundColor: listBackgroundColor,
    },
    modalListContainer: {
      backgroundColor: backdropColor,
      padding: 20,
    },
    modalListItem: {
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderColor: listItemBorderColor,
    },
    modalListItemText: {
      fontSize: listItemFontSize,
    },
    selectedValueContainer: {
      ...selectedValueContainerStyles,
    },
    selectedValueText: {
      ...selectedValueTextStyles,
    },
  })

  const fireOnSelectItem = (value, label) => {
    onSelectItem(value)
    setSelectedValue(label)
    setIsShowPicker(false)
  }

  const ModalComponent = () => (
    <Modal>
      <SafeAreaView>
        <View style={styles.modalListContainer}>
          <FlatList
            style={styles.modalList}
            data={data}
            keyExtractor={item => item.value}
            renderItem={({ item }) => <ListItem value={item.value} label={item.label} />}
          />
        </View>
      </SafeAreaView>
    </Modal>
  )

  const ListItem = ({ value, label }) => (
    <TouchableWithoutFeedback
      key={label + value}
      style={styles.modalListItem}
      onPress={() => fireOnSelectItem(value, label)}
    >
      <Text style={styles.modalListItemText}>{label}</Text>
    </TouchableWithoutFeedback>
  )

  const SelectedItem = () => (
    <TouchableWithoutFeedback
      onPress={() => setIsShowPicker(true)}
      style={styles.selectedValueContainer}
    >
      <Text style={styles.selectedValueText}>{selectedValue}</Text>
    </TouchableWithoutFeedback>
  )

  return isShowPicker ? <ModalComponent /> : <SelectedItem />
}

export default Picker
