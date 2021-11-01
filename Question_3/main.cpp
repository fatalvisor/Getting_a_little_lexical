#include <iostream>
using namespace std;

// List of functions used.
void arrayStatic();
void arrayStackDynamic();
void arrayHeapDynamic();

// Constant array size used for all three arrays.
const int ARRAY_SIZE = 50000;

/*Calls the array functions, each of which return the 
  time it took to run them respectively, in seconds.*/
int main() {
  arrayStatic();
  arrayStackDynamic();
  arrayHeapDynamic();
}

void arrayStatic() {
  clock_t start = clock();
  static int arr[ARRAY_SIZE];

  // Initializes array with values of "i".
  for(int i = 0; i < ARRAY_SIZE; i++) {
    arr[i] = i;
  }

  cout << fixed <<  float(clock() - start)/CLOCKS_PER_SEC  << endl;
}

void arrayStackDynamic(){
  clock_t start = clock();
  int arr[ARRAY_SIZE];
  
  // Initializes array with values of "i".
  for(int i = 0; i < ARRAY_SIZE; i++) {
    arr[i] = i;
  }

  cout << fixed <<  float(clock() - start)/CLOCKS_PER_SEC  << endl;
}

void arrayHeapDynamic(){
  clock_t start = clock();
  int* arr = new int[ARRAY_SIZE];
  
  // Initializes array with values of "i".
  for(int i = 0; i < ARRAY_SIZE; i++) {
    arr[i] = i;
  }

  cout << fixed <<  float(clock() - start)/CLOCKS_PER_SEC  << endl;
}

// PLEASE READ: ANSWER SECTION FOR THE REST OF #3:
/*
Based on the times required to run each function above, I found
that the static array function ran the quickest, on average, 
compared to the other two. On the other hand, the heap dynamic 
array function ran for the longest average time, while the stack 
dynamic array function's runtime usually fell somewhere in 
between.

For reference, a few sample tests of the functions returned these:
0.000263 (static)
0.000292 (stack dynamic)
0.000333 (heap dynamic)

0.000338 (static)
0.000400 (stack dynamic)
0.000427 (heap dynamic)

0.000273 (static)
0.000278 (stack dynamic)
0.000329 (heap dynamic)

Static arrays seem to be faster overall, because they are created
at the same time instruction sets are; they are preallocated
already and don't require any further dynamic allocation. As for
heap dynamic arrays, they are the slowest, because multiple
pointers need to be followed before you can access values in these 
arrays. Stack dynamic arrays fall in between due to their overall
flexibility; they are meant to be neither the best or worst at 
runtime on average.
*/
// END OF #3 ANSWER.
