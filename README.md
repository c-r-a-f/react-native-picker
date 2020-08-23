# react-native-picker

``` javascript
import React, { useState } from 'react'
import Picker from '@c-r-a-f/react-native-picker'

const SampleScreen = () => {
  const [selectedArea, setSelectedArea] = useState(0)

  return (
    <Picker
      data={areas} // [{id: 1, value: 'Eastern'}, {id: 2, value: 'Western'}]
      defaultValue='Choose Area'
      selectedValueContainerStyles={styles.pickerContainer}
      selectedValueTextStyles={styles.pickerText}
      onSelectItem={(id) => {
        setSelectedArea(id);
      }}
    />
  )
}

export default SampleScreen
```
