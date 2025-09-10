import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { NewsArticle } from '../types';
import { COLORS } from '../utils/constants';

interface NewsListProps {
  news: NewsArticle[];
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <TouchableOpacity 
      style={styles.newsItem} 
      onPress={() => handlePress(item.url)}
      activeOpacity={0.7}
    >
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description || 'No description available'}
        </Text>
        <View style={styles.newsFooter}>
          <Text style={styles.newsSource}>{item.source}</Text>
          <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
        </View>
      </View>
      {item.urlToImage ? (
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.newsImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.newsImagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📰 News Headlines</Text>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 20,
    backgroundColor: COLORS.CARD,
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    color: COLORS.TEXT,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 8,
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F4F7',
  },
  newsContent: {
    flex: 1,
    marginRight: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.TEXT,
    lineHeight: 22,
  },
  newsDescription: {
    fontSize: 14,
    color: '#667085',
    marginBottom: 12,
    lineHeight: 20,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.PRIMARY,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newsDate: {
    fontSize: 12,
    color: '#98A2B3',
    fontWeight: '500',
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  newsImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#98A2B3',
    fontWeight: '500',
  },
});