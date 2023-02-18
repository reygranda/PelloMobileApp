import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  Assets,
  Typography,
  Spacings,
  Text,
  Button,
  Keyboard,
  Incubator,
  Avatar,
  Card,
  TextField,
  Colors,
  ExpandableSection,
  ExpandableSectionProps,
} from 'react-native-ui-lib'; //eslint-disable-line
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ProjectCard from './ProjectCard';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/Ionicons';
import Backarrow from '../assets/backarrow.png';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, isFocused } from 'react';
import { getItemLabel } from 'react-native-ui-lib/src/components/picker/PickerPresenter';
import Spinner from 'react-native-loading-spinner-overlay';

const axios = require('axios');

export default function ViewProject({ route, navigation }) {
  const [expand, setExpand] = useState(false);
  const [buckets, setBuckets] = React.useState(null);
  const isFocused = useIsFocused();
  const { projectTitle, description, id } = route.params;

  useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        getInitialData();
      }
    }
    fetchData();
  }, [isFocused]);

  const getInitialData = async () => {
    const res = await axios.get(
      'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/getProject',
      { params: { id: id } }
    );
    await setBuckets([res.data]);
  };

  return (
    <View>
      {buckets === null && <Spinner/>}
      {(buckets || buckets == "")  &&
        <KeyboardAwareScrollView>
          {console.log(buckets)}
          <View style={styles.header}>
            <View style={styles.row1}>
              <Icon.Button
                style={styles.icon}
                name="arrow-back"
                size={28}
                backgroundColor="#fff"
                color="#000"
              ></Icon.Button>

              <Text style={styles.headertitle}>{projectTitle}</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <Text style={styles.headerTitle2}>Description</Text>
              <Text style={styles.projDescription}>{description}</Text>
            </View>
          </View>

          <View style={styles.bucketContainer}>
            <View style={styles.bucketAdd}>
              <Text style={styles.bucketTitle}>Buckets</Text>
              <TouchableOpacity style={styles.bucketAddButton}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            {buckets.map((item, i) => (
              <View key={i}>  
                {console.log(item)}
                {Object.keys(item).length === 0 && 
                  <Text>Add a Bucket to get started</Text>
                }
                {Object.keys(item).length != 0 && 
                  <View>
                    <ExpandableSection
                      expanded={true}
                      top={false}
                      sectionHeader={
                        <View style={styles.bucketCat}>
                          <Text>{Object.keys(item)}</Text>
                          <Icon style={styles.icon}></Icon>
                        </View>
                      }
                      onPress={() => setExpand(!expand)}
                    ></ExpandableSection>
                    {expand && 
                      Object.values(item).map((task, j) => (
                      (
                        <Card key={j} marginTop={10} marginBottom={20} flexDirection="row">
                          <Card.Image
                            source={{
                              uri: 'https://picsum.photos/200/300',
                            }}
                            height={80}
                            width={100}
                          />
                          <View flexDirection="flex-column" alignSelf="center">
                            <Text>{task[j].taskName}</Text>
                            <Text>Assigned to: {task[j].assignedTo}</Text>
                          </View>
                        </Card>
                      ))
                      )}
                  </View>
                }
              </View>
            ))}
            <View style={styles.btn}>
              <Button
                borderRadius={5}
                backgroundColor="#1C1018"
                size="large"
                color="#fff"
                style={styles.btn}
              >
                <Text style={styles.btnText}>Createff</Text>
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'center',
  },

  headertitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  icon: {
    marginLeft: -10,
  },
  headerTitle2: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    paddingVertical: 20,
  },
  projDescription: {
    color: '#989595',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  editBtn: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bucketAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  bucketAddButton: {
    flex: 1,
    textAlign: 'right',
    flexDirection: 'row-reverse',
  },
  bucketContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'column',
  },
  bucketTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  underline: {
    borderColor: '#1C1018',
    borderBottomColor: '#1C1018',
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    justifyContent: 'flex-end',
  },
  btn: {
    marginTop: 280,
  },
  bucketCat: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
