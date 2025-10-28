import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '@/components/common/Themed';

export default function FeedScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>수영 기록</Text>
        <Text style={styles.subtitle}>모든 수영 활동을 확인하세요</Text>

        {/* 여기에 수영 기록 목록을 추가할 수 있습니다 */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📝</Text>
          <Text style={styles.placeholderText}>수영 기록이 표시됩니다</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  placeholder: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});

