import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import PaymentFormView from "./PaymentFormView";

/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={(ref) => (this.scrollViewRef = ref)}>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>Subscription Plan: $10/month</Text>
          </View>
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props} />
          </View>
        </ScrollView>
        {/* Scrolls to the payment form
         */}
        <KeyboardSpacer
          style={{ maxHeight: 120 }}
          onToggle={() => {
            setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  textWrapper: {
    marginTop: 0,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
  cardFormWrapper: {
    padding: 10,
    marginVertical: 15,
  },
});
