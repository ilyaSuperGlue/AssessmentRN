import { useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useGetcolor from '../../../lib/useGetColor';
import { useTransactionStore } from '../../../store/useTransactionStore';

type PageItem = number | 'ellipsis';

const TrxPagination = () => {
  const { colors } = useGetcolor();
  const { currentPage, setCurrentPage, maxPage } = useTransactionStore();

  const pages = useMemo<PageItem[]>(() => {
    const totalPages = maxPage ?? 1;

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesPerGroup = 6;
    const startPage =
      Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
    const visiblePageCount = Math.min(
      pagesPerGroup,
      totalPages - startPage + 1,
    );
    const visiblePages = Array.from(
      { length: visiblePageCount },
      (_, index) => startPage + index,
    );

    return visiblePages[visiblePages.length - 1] < totalPages
      ? [...visiblePages, 'ellipsis']
      : visiblePages;
  }, [currentPage, maxPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= (maxPage ?? 1) && page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage, maxPage, setCurrentPage],
  );

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < (maxPage ?? 1);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Pressable
          disabled={!canGoPrevious}
          onPress={goToPreviousPage}
          hitSlop={8}
        >
          <Text
            style={[
              styles.txtPagination,
              {
                color: canGoPrevious ? colors.accent : colors.foreground + '44',
              },
            ]}
          >
            Prev
          </Text>
        </Pressable>

        <View style={styles.pages}>
          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <Text
                key={`ellipsis-${index}`}
                style={[styles.txtPage, { color: colors.foreground + '88' }]}
              >
                ...
              </Text>
            ) : (
              <Pressable
                key={page}
                onPress={() => goToPage(page)}
                hitSlop={6}
                style={[
                  styles.page,
                  page === currentPage && { backgroundColor: colors.accent },
                ]}
              >
                <Text
                  style={[
                    styles.txtPage,
                    {
                      color:
                        page === currentPage ? colors.white : colors.foreground,
                    },
                  ]}
                >
                  {page}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <Pressable disabled={!canGoNext} onPress={goToNextPage} hitSlop={8}>
          <Text
            style={[
              styles.txtPagination,
              { color: canGoNext ? colors.accent : colors.foreground + '44' },
            ]}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TrxPagination;

const styles = StyleSheet.create(() => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 54,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#eaeaeaaa',
  },
  content: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  txtPagination: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  page: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPage: {
    fontSize: 13,
    fontWeight: '600',
  },
}));
