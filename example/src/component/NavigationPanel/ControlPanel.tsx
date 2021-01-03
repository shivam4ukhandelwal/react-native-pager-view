import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import type { NavigationPanelProps } from './types';

export function ControlsPanel({
  activePage,
  isAnimated,
  pages,
  scrollState,
  scrollEnabled,
  dotsEnabled,
  progress,
  disablePagesAmountManagement,
  setPage,
  addPage,
  removePage,
  toggleScroll,
  toggleDots,
  toggleAnimation,
}: NavigationPanelProps) {
  const firstPage = useCallback(() => setPage(0), [setPage]);
  const prevPage = useCallback(() => setPage(activePage - 1), [
    activePage,
    setPage,
  ]);
  const nextPage = useCallback(() => setPage(activePage + 1), [
    setPage,
    activePage,
  ]);
  const lastPage = useCallback(() => setPage(pages.length - 1), [
    pages.length,
    setPage,
  ]);
  return (
    <>
      <View style={styles.buttons}>
        <Button
          text={scrollEnabled ? 'Scroll Enabled' : 'Scroll Disabled'}
          onPress={toggleScroll}
        />
        <Button
          style={styles.buttonAdjustment}
          text={dotsEnabled ? 'Hide dots' : 'Show dots'}
          onPress={toggleDots}
        />
      </View>
      {!disablePagesAmountManagement ? (
        <View style={styles.buttons}>
          <Button text="Add new page" onPress={addPage} />
          <Button text="Remove last page" onPress={removePage} />
        </View>
      ) : null}
      <View style={styles.buttons}>
        <Button
          text={isAnimated ? 'Turn off animations' : 'Turn animations back on'}
          onPress={toggleAnimation}
        />
        <View style={styles.scrollState}>
          <Text style={styles.scrollStateText}>
            ScrollState[ {scrollState} ]
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button text="Start" disabled={activePage === 0} onPress={firstPage} />
        <Button text="Prev" disabled={activePage === 0} onPress={prevPage} />
        <Button
          text="Next"
          disabled={activePage === pages.length - 1}
          onPress={nextPage}
        />
        <Button
          text="Last"
          disabled={activePage === pages.length - 1}
          onPress={lastPage}
        />
      </View>
      <View style={styles.progress}>
        <Text style={styles.buttonText}>
          Page {activePage + 1} / {pages.length}{' '}
        </Text>
        <ProgressBar numberOfPages={pages.length} progress={progress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  toggleVisibilityButtonContainer: {
    position: 'absolute',
    left: 8,
    bottom: '100%',
    flexDirection: 'row',
  },
  toggleVisibilityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  toggleVisibilityButtonActive: {
    backgroundColor: '#fff',
  },
  toggleVisibilityText: {
    color: '#fff',
    fontSize: 20,
  },
  toggleVisibilityTextActive: {
    color: '#000',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hiddenContainer: {
    height: 0,
    overflow: 'hidden',
  },
  buttonAdjustment: {
    flex: 1,
  },
  progress: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 20,
  },
  scrollState: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollStateText: {
    color: '#99d1b7',
    textAlign: 'center',
  },
});
