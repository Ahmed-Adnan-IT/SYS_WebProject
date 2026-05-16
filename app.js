'use strict';

// ════════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════════
let snippets = [];
let activeSection = 'all';
let activeTags = [];
let pendingDeleteId = null;
let editingCustomTags = [];
let editingId = null;
let sortMode = 'newest';

const STORAGE_KEY = 'cpp-archive-v5';
const THEME_KEY = 'cpp-archive-theme';
const ACCENT_KEY = 'cpp-archive-accent';
const STORAGE_LIMIT = 5 * 1024 * 1024;

const SEED = [
  { id:'lesson_01', title:'Welcome Message',
    description:'Prints a welcome greeting to the console using cout.',
    section:'basics', tags:['io'], customTags:['hello-world'], createdAt:1779001440000,
    code:`#include<iostream>
using namespace std;
void main()
{
    // print welcome message
    cout << "Welcome to C++ programming ";
}` },

  { id:'lesson_02', title:'Average of Three Numbers',
    description:'Reads three integers from the user and computes their floating-point average.',
    section:'basics', tags:['io'], customTags:['arithmetic'], createdAt:1779001380000,
    code:`#include<iostream>
using namespace std;
void main ()
{
    int x, y, z;
    double av;
    cout << "Enter Three Numbers" << endl;
    cin >> x >> y >> z;
    av = (x + y + z) / 3.0;
    cout << "The average is: " << av;
}` },

  { id:'lesson_03', title:'Fahrenheit to Celsius',
    description:'Converts a Fahrenheit temperature entered by the user into its Celsius equivalent.',
    section:'basics', tags:['io'], customTags:['conversion'], createdAt:1779001320000,
    code:`#include<iostream>
using namespace std;
int main()
{
    float fahrenheit, celsius;
    cout << "Enter the Temperature in Fahrenheit: ";
    cin >> fahrenheit;
    celsius = (fahrenheit - 32) / 1.8;
    cout << "\\nEquivalent Temperature in Celsius: " << celsius;
    cout << endl;
    return 0;
}` },

  { id:'lesson_04', title:'Sizes of Data Types',
    description:'Prints the size in bytes of char, int, float and double using sizeof().',
    section:'basics', tags:['io'], customTags:['sizeof','data-types'], createdAt:1779001260000,
    code:`#include <iostream>
using namespace std;
int main() {
    cout << "Size of char: " << sizeof(char) << " byte" << endl;
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of float: " << sizeof(float) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    return 0;
}` },

  { id:'lesson_05', title:'Swap Two Numbers',
    description:'Reads two numbers and swaps them using a temp variable only when the first is greater than the second.',
    section:'basics', tags:['io','conditionals'], customTags:['swap'], createdAt:1779001200000,
    code:`#include <iostream>
using namespace std;
int main()
{
    int num1, num2, temp;
    temp = 0;
    cin >> num1 >> num2;
    cout << "Before swapping." << endl;
    cout << "number1 = " << num1 << ", number2 = " << num2 << endl;

    if (num1 > num2)
    {
        temp = num1;
        num1 = num2;
        num2 = temp;
        cout << "\\nAfter swapping." << endl;
        cout << "number1 = " << num1 << ", number2 = " << num2 << endl;
    }
    else
        cout << "num1 is less than num2" << endl;

    return 0;
}` },

  { id:'lesson_06', title:'Even or Odd Check',
    description:'Determines whether a number is even or odd using both an if/else statement and the ternary operator.',
    section:'basics', tags:['io','conditionals'], customTags:['ternary','modulo'], createdAt:1779001140000,
    code:`#include <iostream>
using namespace std;
int main() {
    int n;
    cout << "Enter an integer: ";
    cin >> n;

    // Using if..else
    if (n % 2 == 0)
        cout << n << " is even.";
    else
        cout << n << " is odd.";

    // Using ternary operator
    (n % 2 == 0) ? cout << n << " is even." : cout << n << " is odd.";

    return 0;
}` },

  { id:'lesson_07', title:'Leap Year Check',
    description:'Decides whether a year is a leap year using combined logical operators (&&, ||).',
    section:'basics', tags:['io','conditionals'], customTags:['logical-operators'], createdAt:1779001080000,
    code:`#include <iostream>
using namespace std;
int main() {
    int year;
    cout << "Enter a year: ";
    cin >> year;

    // Using Logical Operators
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        cout << year << " is a leap year.";
    }
    else {
        cout << year << " is not a leap year.";
    }

    return 0;
}` },

  { id:'lesson_08', title:'Simple Calculator (Switch)',
    description:'A basic calculator that performs + - * / on two operands using switch-case on the operator.',
    section:'basics', tags:['io','conditionals'], customTags:['switch','calculator'], createdAt:1779001020000,
    code:`#include <iostream>
using namespace std;
int main() {
    char op;
    float num1, num2;
    cout << "Enter operator: +, -, *, /: ";
    cin >> op;
    cout << "Enter two operands: ";
    cin >> num1 >> num2;

    switch(op) {
        case '+':
            cout << num1 << " + " << num2 << " = " << num1 + num2;
            break;
        case '-':
            cout << num1 << " - " << num2 << " = " << num1 - num2;
            break;
        case '*':
            cout << num1 << " * " << num2 << " = " << num1 * num2;
            break;
        case '/':
            cout << num1 << " / " << num2 << " = " << num1 / num2;
            break;
        default:
            cout << "Error! operator is not correct";
            break;
    }
    return 0;
}` },

  { id:'lesson_09', title:'Day Name from Number',
    description:'Reads a day number (1-7) and prints the matching weekday name using switch-case.',
    section:'basics', tags:['io','conditionals'], customTags:['switch'], createdAt:1779000960000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int day;
    cout << "Enter the day No. ";
    cin >> day;
    switch (day)
    {
        case 1: cout << "Sunday"; break;
        case 2: cout << "Monday"; break;
        case 3: cout << "Tuesday"; break;
        case 4: cout << "Wednesday"; break;
        case 5: cout << "Thursday"; break;
        case 6: cout << "Friday"; break;
        case 7: cout << "Saturday"; break;
        default: cout << "Invalid day No.";
    }
    return 0;
}` },

  { id:'lesson_10', title:'Print Numbers 1 to 50',
    description:'Prints integers from 1 to 50 on the same line using a for loop.',
    section:'basics', tags:['io','loops'], customTags:['for-loop'], createdAt:1779000900000,
    code:`#include <iostream>
using namespace std;
int main()
{
    int x;
    for (x = 1; x <= 50; x++)
        cout << x << " ";
    return 0;
}` },

  { id:'lesson_11', title:'Sum of Odd Inputs (20 numbers)',
    description:'Reads 20 numbers and accumulates the sum of only the odd ones.',
    section:'basics', tags:['io','loops','conditionals'], customTags:['accumulator','modulo'], createdAt:1779000840000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int i, x, sum = 0;
    for(i = 1; i <= 20; i++)
    {
        cin >> x;
        if (x % 2 != 0)
        {
            sum = sum + x;
        }
    }
    cout << sum;
    return 0;
}` },

  { id:'lesson_12', title:'Sum of Odd Numbers 1 to 20',
    description:'Sums all odd numbers from 1 to 20 using a step-of-two for loop (no input needed).',
    section:'basics', tags:['io','loops'], customTags:['accumulator'], createdAt:1779000780000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int i, sum = 0;
    for(i = 1; i <= 20; i = i + 2)
    {
        sum = sum + i;
    }
    cout << sum;
    return 0;
}` },

  { id:'lesson_13', title:'Right-Triangle of Plus Signs',
    description:"Draws a right-angled triangle of '+' characters using nested for loops (row i prints i pluses).",
    section:'basics', tags:['io','loops'], customTags:['nested-loops','pattern'], createdAt:1779000720000,
    code:`#include<iostream>
using namespace std;
void main()
{
    int i, j;
    for (i = 1; i <= 10; i++)
    {
        for (j = 1; j <= i; j++)
            cout << "+";
        cout << endl;
    }
}` },

  { id:'lesson_14', title:'Sum of Odd 1-99 (While Loop)',
    description:'Sums odd numbers from 1 to 99 using a while loop with a step of 2.',
    section:'basics', tags:['io','loops'], customTags:['while-loop'], createdAt:1779000660000,
    code:`#include<iostream>
using namespace std;
void main()
{
    int count = 1, sum = 0;
    while (count <= 99)
    {
        sum = sum + count;
        count = count + 2;
    }
    cout << "sum is: " << sum << endl;
}` },

  { id:'lesson_15', title:'Cube Positive Numbers (While)',
    description:'Keeps reading numbers and printing their cubes until the user enters a non-positive value (sentinel-controlled loop).',
    section:'basics', tags:['io','loops','conditionals'], customTags:['while-loop','sentinel'], createdAt:1779000600000,
    code:`#include<iostream>
using namespace std;
void main()
{
    int num = 1, cubenum;
    while (num > 0)
    {
        cout << "Enter positive number " << endl;
        cin >> num;
        if(num > 0) {
            cubenum = num * num * num;
            cout << "cube number is :" << cubenum << endl;
        }
    }
}` },

  { id:'lesson_16', title:'Sum Function',
    description:'Defines an external function sum(a,b) that returns a+b, then calls it from main.',
    section:'functions', tags:['io','functions'], customTags:['return-value'], createdAt:1779000540000,
    code:`#include<iostream>
using namespace std;

int sum(int a, int b)
{
    int result;
    result = a + b;
    return result;
}

int main()
{
    int x, y, s;
    cin >> x >> y;
    s = sum(x, y);
    cout << s;
    return 0;
}` },

  { id:'lesson_17', title:'Max of Two Numbers (Function)',
    description:'An external function max(x,y) returns the larger of two integers using if/else, then main prints the result.',
    section:'functions', tags:['io','conditionals','functions'], customTags:['return-value'], createdAt:1779000480000,
    code:`#include<iostream>
using namespace std;

int max(int x, int y)
{
    if(x > y)
        return x;
    else
        return y;
}

int main()
{
    int a, b, m;
    cout << "Enter two numbers" << endl;
    cin >> a >> b;
    m = max(a, b);
    cout << "The max number is " << m;
    return 0;
}` },

  { id:'lesson_18', title:'Rectangle Area and Circumference',
    description:'Two external functions: rec_area(L,w) and rec_circum(L,w). Main reads dimensions and prints both values.',
    section:'functions', tags:['io','functions'], customTags:['multiple-functions','geometry'], createdAt:1779000420000,
    code:`#include<iostream>
using namespace std;

float rec_area(float L, float w)
{
    return (L * w);
}

float rec_circum(float L, float w)
{
    return ((L + w) * 2);
}

int main()
{
    float length, width, A, C;
    cout << "Enter the length and width of rectangle " << endl;
    cin >> length >> width;
    A = rec_area(length, width);
    C = rec_circum(length, width);
    cout << "Area: " << A << " Circumference: " << C << endl;
    return 0;
}` },

  { id:'lesson_19', title:'Average Function',
    description:'External function aver(x1,x2) returns the floating-point average of two integers.',
    section:'functions', tags:['io','functions'], customTags:['return-value'], createdAt:1779000360000,
    code:`#include<iostream>
using namespace std;

float aver(int x1, int x2)
{
    float z;
    z = (x1 + x2) / 2.0;
    return (z);
}

void main()
{
    float av;
    int num1, num2;
    cout << "Enter 2 positive number \\n";
    cin >> num1 >> num2;
    av = aver(num1, num2);
    cout << av;
}` },

  { id:'lesson_20', title:'Max and Min in Array',
    description:'Reads 10 numbers into an array, then finds and prints the largest and smallest values.',
    section:'data-structures', tags:['io','arrays','loops','conditionals'], customTags:['max-min'], createdAt:1779000300000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int x[10], i, max, min;
    for(i = 0; i < 10; i++)
        cin >> x[i];

    max = x[0];
    min = x[0];

    for(i = 1; i < 10; i++)
        if(x[i] > max)
            max = x[i];

    for(i = 1; i < 10; i++)
        if(x[i] < min)
            min = x[i];

    cout << "max= " << max << endl;
    cout << "min= " << min << endl;
    return 0;
}` },

  { id:'lesson_21', title:'Add Two Arrays Element-Wise',
    description:'Reads two arrays of 10 elements each, then prints a third array whose entries are the element-wise sums.',
    section:'data-structures', tags:['io','arrays','loops'], customTags:['element-wise'], createdAt:1779000240000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int a[10], b[10], c[10], i;
    cout << "Enter the elements of a" << endl;
    for(i = 0; i < 10; i++)
        cin >> a[i];

    cout << "Enter the elements of b" << endl;
    for(i = 0; i < 10; i++)
        cin >> b[i];

    for(i = 0; i < 10; i++)
    {
        c[i] = a[i] + b[i];
        cout << c[i] << " ";
    }
    return 0;
}` },

  { id:'lesson_22', title:'Multiply Array by 3',
    description:'Reads 10 numbers, multiplies each element by 3 in place, then prints the modified array.',
    section:'data-structures', tags:['io','arrays','loops'], customTags:['in-place'], createdAt:1779000180000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int a[10], i;
    for(i = 0; i < 10; i++)
        cin >> a[i];

    for(i = 0; i < 10; i++)
        a[i] = a[i] * 3;

    for(i = 0; i < 10; i++)
        cout << a[i] << " ";

    return 0;
}` },

  { id:'lesson_23', title:'Split Array into Even and Odd',
    description:'Reads 10 numbers and partitions them into two separate arrays: even values and odd values, then prints each list.',
    section:'data-structures', tags:['io','arrays','loops','conditionals'], customTags:['partition','modulo'], createdAt:1779000120000,
    code:`#include<iostream>
using namespace std;
int main()
{
    int a[10], even[10], odd[10], i, j = 0, k = 0;

    for(i = 0; i < 10; i++)
        cin >> a[i];

    for(i = 0; i < 10; i++)
    {
        if(a[i] % 2 == 0)
            even[j++] = a[i];
        else
            odd[k++] = a[i];
    }

    for(i = 0; i < j; i++)
        cout << even[i] << " ";
    cout << endl;

    for(i = 0; i < k; i++)
        cout << odd[i] << " ";

    return 0;
}` },

  { id:'lesson_24', title:'Average of 2D Array (4x6)',
    description:'Reads a 4-by-6 two-dimensional array, sums all 24 elements, then prints their floating-point average.',
    section:'data-structures', tags:['io','arrays','loops'], customTags:['2d-array','nested-loops'], createdAt:1779000060000,
    code:`#include <iostream>
using namespace std;
int main()
{
    int i, j, a[4][6], sum = 0;
    float av;

    for(i = 0; i < 4; ++i)
        for(j = 0; j < 6; ++j)
            cin >> a[i][j];

    for(i = 0; i < 4; ++i)
        for(j = 0; j < 6; ++j)
            sum = sum + a[i][j];

    av = sum / 24.0;
    cout << av;
    return 0;
}` }
];

// ════════════════════════════════════════════════════════════════
// PERSISTENCE
// ════════════════════════════════════════════════════════════════
function load() {
  try { const d = localStorage.getItem(STORAGE_KEY); if (d) { snippets = JSON.parse(d); return; } } catch(e){}
  snippets = JSON.parse(JSON.stringify(SEED));
  // Persist the seed so timestamps stay stable across reloads.
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets)); } catch(e){}
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets)); updateStorageMeter(); updateDueCount(); }
  catch(e) { showToast('Storage full! Export your data.', 'error'); }
}

// ════════════════════════════════════════════════════════════════
// UTILITIES (testable)
// ════════════════════════════════════════════════════════════════
function escapeHTML(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Unknown';
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) { const m = Math.floor(seconds / 60); return `${m} minute${m===1?'':'s'} ago`; }
  if (seconds < 86400) { const h = Math.floor(seconds / 3600); return `${h} hour${h===1?'':'s'} ago`; }
  if (seconds < 2592000) { const d = Math.floor(seconds / 86400); return `${d} day${d===1?'':'s'} ago`; }
  if (seconds < 31536000) { const mo = Math.floor(seconds / 2592000); return `${mo} month${mo===1?'':'s'} ago`; }
  const y = Math.floor(seconds / 31536000);
  return `${y} year${y===1?'':'s'} ago`;
}

function countLines(code) {
  if (!code) return 0;
  return code.split('\n').length;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024*1024) return `${(n/1024).toFixed(1)} KB`;
  return `${(n/1024/1024).toFixed(2)} MB`;
}

// ════════════════════════════════════════════════════════════════
// CLASSIFIER
// ════════════════════════════════════════════════════════════════
const RULES = {
  'data-structures': { label:'Data Structures', weight:3, badge:'badge-violet', rules:[
    { pat:[/\bint\s+\w+\s*\[/,/vector\s*</,/\w+\[\d+\]/,/\barray\s*</,/\bnew\s+\w+\s*\[/], tag:'arrays', sc:5 },
    { pat:[/struct\s+Node/i,/class\s+Node/i,/->next/,/->prev/,/LinkedList/i], tag:'linked-list', sc:5 },
    { pat:[/\bstack\s*</,/std::stack/i,/class\s+Stack/i], tag:'stack', sc:5 },
    { pat:[/\bqueue\s*</,/std::queue/i,/enqueue/i,/dequeue/i], tag:'queue', sc:5 },
    { pat:[/struct\s+TreeNode/i,/class\s+Tree/i,/->left/,/->right/,/BST/i,/BinaryTree/i], tag:'tree', sc:5 },
    { pat:[/Graph/i,/adjacency/i,/\bBFS\b/,/\bDFS\b/,/dijkstra/i], tag:'graph', sc:5 },
    { pat:[/unordered_map/,/std::map/,/HashMap/i], tag:'hash-map', sc:4 },
    { pat:[/unordered_set/,/std::set/], tag:'set', sc:3 },
  ]},
  'functions': { label:'Functions', weight:2, badge:'badge-orange', rules:[
    // Note: the 'functions' tag itself is added by countExternalFunctions() in analyzeCode
    { pat:[/&\s*\w+\s*[,)]/], tag:'pass-by-reference', sc:3 },
    { pat:[/\bauto\s+\w+\s*\(/], tag:'auto-return', sc:3 },
    { pat:[/\brecursi/i], tag:'recursion', sc:3 },
    { pat:[/\bvoid\s+(?!main\b)\w+\s*\(/], tag:'void-function', sc:3 },
    { pat:[/\bdefault\s*[:)]|=\s*\d+\s*[,)]/], tag:'default-args', sc:2 },
  ]},
  'basics': { label:'Basics', weight:1, badge:'badge-cyan', rules:[
    { pat:[/\bfor\s*\(/,/\bwhile\s*\(/,/\bdo\s*\{/], tag:'loops', sc:3 },
    { pat:[/\bif\s*\(/,/\bswitch\s*\(/,/\bcase\s+/], tag:'conditionals', sc:3 },
    { pat:[/\*\w+/,/&\w+/,/nullptr/,/\bNULL\b/], tag:'pointers', sc:4 },
    { pat:[/\bstring\s+/,/std::string/,/\bchar\s/], tag:'strings', sc:3 },
    { pat:[/cin\s*>>/,/cout\s*<</,/getline/], tag:'io', sc:2 },
  ]}
};

// Detects functions defined OUTSIDE main() and outside class bodies.
// Returns the count of unique top-level user-defined functions (excluding main).
function countExternalFunctions(code) {
  // Strip comments and string literals (avoids false positives)
  let clean = code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");

  // Remove class/struct bodies via brace matching so class methods don't count
  const out = [];
  let i = 0, n = clean.length;
  while (i < n) {
    const slice = clean.slice(i);
    const m = slice.match(/\b(class|struct)\s+\w+[^{;]*\{/);
    if (!m) { out.push(slice); break; }
    out.push(slice.slice(0, m.index));
    let j = i + m.index + m[0].length, depth = 1;
    while (j < n && depth > 0) {
      if (clean[j] === '{') depth++;
      else if (clean[j] === '}') depth--;
      j++;
    }
    i = j;
  }
  const topLevel = out.join('');

  // Find  name(args) { …  patterns at top level
  const re = /\b(\w+)\s*\([^)]*\)\s*(?:const\s*)?\{/g;
  const reserved = new Set(['if','for','while','switch','catch','do','sizeof','return','else','main']);
  const names = new Set();
  let mm;
  while ((mm = re.exec(topLevel)) !== null) {
    const name = mm[1];
    if (reserved.has(name)) continue;
    if (KW.includes(name)) continue;
    names.add(name);
  }
  return names.size;
}

function analyzeCode(code) {
  const scores = {'basics':0,'data-structures':0,'functions':0};
  const tags = new Set();
  for (const [sid, def] of Object.entries(RULES)) {
    for (const rule of def.rules) {
      if (rule.pat.some(p => p.test(code))) {
        scores[sid] += rule.sc * def.weight;
        tags.add(rule.tag);
      }
    }
  }
  // Top-level function detection — adds 'functions' tag only when functions
  // are defined OUTSIDE main() and outside any class body.
  const extFnCount = countExternalFunctions(code);
  if (extFnCount > 0) {
    scores['functions'] += 6 * RULES.functions.weight * extFnCount;
    tags.add('functions');
  }
  let primary = 'basics', max = 0;
  for (const [s,v] of Object.entries(scores)) if (v > max){ max=v; primary=s; }
  return { primary, tags: [...tags] };
}

// ════════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTER
// ════════════════════════════════════════════════════════════════
const KW = ['if','else','for','while','do','switch','case','break','continue','return','class','struct','public','private','protected','virtual','override','static','const','new','delete','this','template','typename','namespace','using','try','catch','throw','operator','friend','inline','explicit','mutable','volatile','enum','typedef','sizeof','nullptr','true','false'];
const TY = ['int','char','float','double','void','bool','long','short','unsigned','signed','auto','string','vector','map','set','queue','stack','pair','size_t','std','deque','list','array','tuple'];

// Proper char-by-char tokenizer — preserves the original text exactly.
// Output stripped of HTML tags equals the original code byte-for-byte.
function hl(raw) {
  if (!raw) return '';
  const n = raw.length;
  const out = [];
  let i = 0;
  let atLineStart = true;

  const isWs    = c => c === ' ' || c === '\t' || c === '\n' || c === '\r';
  const isDigit = c => c >= '0' && c <= '9';
  const isAlpha = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  const isWord  = c => isAlpha(c) || isDigit(c);

  while (i < n) {
    const c = raw[i];

    // Newline — track line-start for preprocessor detection
    if (c === '\n') { out.push('\n'); i++; atLineStart = true; continue; }

    // Whitespace (preserve verbatim — no span wrap)
    if (isWs(c)) {
      let j = i;
      while (j < n && isWs(raw[j]) && raw[j] !== '\n') j++;
      out.push(escapeHTML(raw.slice(i, j)));
      i = j;
      continue;
    }

    // Line comment
    if (c === '/' && raw[i+1] === '/') {
      let j = i + 2;
      while (j < n && raw[j] !== '\n') j++;
      out.push(`<span class="c">${escapeHTML(raw.slice(i, j))}</span>`);
      i = j;
      atLineStart = false;
      continue;
    }

    // Block comment
    if (c === '/' && raw[i+1] === '*') {
      let j = i + 2;
      while (j < n - 1 && !(raw[j] === '*' && raw[j+1] === '/')) j++;
      j = Math.min(j + 2, n);
      out.push(`<span class="c">${escapeHTML(raw.slice(i, j))}</span>`);
      i = j;
      atLineStart = false;
      continue;
    }

    // String / char literal
    if (c === '"' || c === "'") {
      const quote = c;
      let j = i + 1;
      while (j < n && raw[j] !== quote && raw[j] !== '\n') {
        if (raw[j] === '\\' && j + 1 < n) j += 2;
        else j++;
      }
      if (j < n && raw[j] === quote) j++;
      out.push(`<span class="s">${escapeHTML(raw.slice(i, j))}</span>`);
      i = j;
      atLineStart = false;
      continue;
    }

    // Preprocessor directive (#include, #define, …)
    if (c === '#' && atLineStart) {
      let j = i;
      while (j < n && raw[j] !== '\n') j++;
      out.push(`<span class="p">${escapeHTML(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    // Number (incl. hex, suffixes, decimals)
    if (isDigit(c) || (c === '.' && isDigit(raw[i+1]))) {
      let j = i;
      if (c === '0' && (raw[i+1] === 'x' || raw[i+1] === 'X')) {
        j = i + 2;
        while (j < n && /[0-9a-fA-F]/.test(raw[j])) j++;
      } else {
        while (j < n && (isDigit(raw[j]) || raw[j] === '.')) j++;
      }
      while (j < n && /[uUlLfF]/.test(raw[j])) j++;
      out.push(`<span class="n">${escapeHTML(raw.slice(i, j))}</span>`);
      i = j;
      atLineStart = false;
      continue;
    }

    // Identifier / keyword / type / function
    if (isAlpha(c)) {
      let j = i;
      while (j < n && isWord(raw[j])) j++;
      const word = raw.slice(i, j);
      let cls = null;
      if (KW.includes(word))      cls = 'k';
      else if (TY.includes(word)) cls = 't';
      else {
        // function call? — name (optionally followed by spaces, not newline) then '('
        let k = j;
        while (k < n && (raw[k] === ' ' || raw[k] === '\t')) k++;
        if (raw[k] === '(') cls = 'f';
      }
      out.push(cls
        ? `<span class="${cls}">${escapeHTML(word)}</span>`
        : escapeHTML(word));
      i = j;
      atLineStart = false;
      continue;
    }

    // Any other char (punctuation, operators) — emit raw, escaped
    out.push(escapeHTML(c));
    i++;
    atLineStart = false;
  }

  return out.join('');
}

function sectionLabel(id) { return (RULES[id]||{label:'All'}).label; }
function sectionBadge(id) { return (RULES[id]||{badge:'badge-cyan'}).badge; }

// ════════════════════════════════════════════════════════════════
// FILTERING & SORTING
// ════════════════════════════════════════════════════════════════
function tagCounts() {
  const m = new Map();
  snippets.forEach(sn => {
    [...sn.tags, ...(sn.customTags||[])].forEach(t => m.set(t, (m.get(t)||0)+1));
  });
  return m;
}

function filtered() {
  let list = snippets.filter(sn => {
    if (activeSection !== 'all' && sn.section !== activeSection) return false;
    if (activeTags.length > 0) {
      const all = [...sn.tags, ...(sn.customTags||[])];
      if (!activeTags.every(t => all.includes(t))) return false;
    }
    return true;
  });
  switch (sortMode) {
    case 'oldest': list.sort((a,b) => (a.createdAt||0) - (b.createdAt||0)); break;
    case 'title': list.sort((a,b) => a.title.localeCompare(b.title)); break;
    case 'lines-desc': list.sort((a,b) => countLines(b.code) - countLines(a.code)); break;
    case 'lines-asc': list.sort((a,b) => countLines(a.code) - countLines(b.code)); break;
    default: list.sort((a,b) => (b.createdAt||0) - (a.createdAt||0));
  }
  return list;
}

// ════════════════════════════════════════════════════════════════
// RENDERING
// ════════════════════════════════════════════════════════════════
function renderTagBar() {
  const counts = tagCounts();
  const tags = [...counts.keys()].sort();
  const el = document.getElementById('tag-chips');
  el.innerHTML = '';
  tags.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tag' + (activeTags.includes(t) ? ' active' : '');
    btn.innerHTML = `${escapeHTML(t)}<span class="tag-count">${counts.get(t)}</span>`;
    btn.addEventListener('click', () => toggleTagFilter(t));
    el.appendChild(btn);
  });
  document.getElementById('clear-tags-btn').style.display = activeTags.length > 0 ? 'inline-flex' : 'none';
  document.getElementById('filter-bar').style.display = tags.length > 0 ? 'block' : 'none';
}

function toggleTagFilter(t) {
  activeTags = activeTags.includes(t) ? activeTags.filter(x => x !== t) : [...activeTags, t];
  renderAll();
}
function clearTagFilters() { activeTags = []; renderAll(); }

function makeCard(sn, i) {
  const allT = [...sn.tags, ...(sn.customTags||[])];
  const card = document.createElement('div');
  card.className = 'snippet-card';
  card.style.animationDelay = `${i*55}ms`;
  card.dataset.id = sn.id;
  card.dataset.created = sn.createdAt || 0;

  const lines = countLines(sn.code);
  const timeAgo = formatRelativeTime(sn.createdAt);

  card.innerHTML = `
    <div class="card-head">
      <div class="card-actions-row">
        <button class="icon-btn act-copy" title="Copy code">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
        <button class="icon-btn act-dl" title="Download .cpp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
        <button class="icon-btn act-edit" title="Edit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
        <button class="icon-btn danger act-del" title="Delete">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        </button>
      </div>
      <div class="card-title">${escapeHTML(sn.title)}</div>
      <div class="card-desc">${escapeHTML(sn.description)}</div>
      <div class="card-tags"></div>
      <div class="card-meta">
        <span class="card-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          <span class="lines-badge">${lines}</span> ${lines === 1 ? 'line' : 'lines'}
        </span>
        <span class="card-meta-divider"></span>
        <span class="card-meta-item time">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span class="time-text">${escapeHTML(timeAgo)}</span>
        </span>
      </div>
    </div>
    <div class="code-wrap"><pre class="code-block"><code>${hl(sn.code)}</code></pre></div>`;

  // tags
  const tagsHost = card.querySelector('.card-tags');
  const sectBadge = document.createElement('span');
  sectBadge.className = `badge ${sectionBadge(sn.section)}`;
  sectBadge.textContent = `# ${sectionLabel(sn.section)}`;
  tagsHost.appendChild(sectBadge);
  allT.slice(0, 7).forEach(t => {
    const isCust = (sn.customTags||[]).includes(t);
    const tagBtn = document.createElement('button');
    tagBtn.className = 'tag' + (isCust ? ' custom' : '');
    tagBtn.textContent = (isCust ? '⊹ ' : '') + t;
    tagBtn.addEventListener('click', e => { e.stopPropagation(); toggleTagFilter(t); });
    tagsHost.appendChild(tagBtn);
  });

  // wire actions
  card.querySelector('.act-copy').addEventListener('click', e => { e.stopPropagation(); copyCode(sn.id, e.currentTarget); });
  card.querySelector('.act-dl').addEventListener('click', e => { e.stopPropagation(); downloadCpp(sn.id); });
  card.querySelector('.act-edit').addEventListener('click', e => { e.stopPropagation(); openEdit(sn.id); });
  card.querySelector('.act-del').addEventListener('click', e => { e.stopPropagation(); askDelete(sn.id, sn.title); });
  card.querySelector('.card-title').addEventListener('click', () => openDetail(sn.id));

  return card;
}

function renderGrid() {
  const grid = document.getElementById('grid');
  const list = filtered();
  document.getElementById('section-label').textContent = activeSection === 'all' ? 'All Snippets' : sectionLabel(activeSection);
  document.getElementById('count-badge').textContent = `${list.length} ${list.length===1?'item':'items'}`;

  grid.innerHTML = '';
  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.id = 'empty';
    empty.innerHTML = `<div style="font-size:28px;margin-bottom:12px;opacity:.4">⊚</div><h3>No snippets here yet</h3><p>${activeTags.length?'Try removing filters':'Add your first C++ snippet'}</p>`;
    grid.appendChild(empty);
    return;
  }
  list.forEach((sn, i) => grid.appendChild(makeCard(sn, i)));
}

function renderCounts() {
  const counts = {basics:0,'data-structures':0,functions:0};
  snippets.forEach(s => { counts[s.section] = (counts[s.section]||0) + 1; });
  document.getElementById('cnt-all').textContent = snippets.length;
  document.getElementById('cnt-basics').textContent = counts.basics;
  document.getElementById('cnt-ds').textContent = counts['data-structures'];
  document.getElementById('cnt-fn').textContent = counts.functions;
  document.getElementById('stat-total').textContent = snippets.length;
  document.getElementById('stat-tags').textContent = tagCounts().size;
}

const NAV_MAP = { 'all':'all', 'basics':'basics', 'data-structures':'ds', 'functions':'fn' };

function renderAll() {
  renderCounts(); renderTagBar(); renderGrid();
  Object.entries(NAV_MAP).forEach(([sec, id]) => {
    const el = document.getElementById('nav-' + id);
    if (el) el.classList.toggle('active', activeSection === sec);
  });
}

function setSection(id) { activeSection = id; activeTags = []; renderAll(); }

// only update time text (no DOM rebuild) — preserves scroll, copy state, etc.
function refreshTimes() {
  document.querySelectorAll('.snippet-card').forEach(card => {
    const created = Number(card.dataset.created);
    const tEl = card.querySelector('.time-text');
    if (tEl && created) tEl.textContent = formatRelativeTime(created);
  });
}

// ════════════════════════════════════════════════════════════════
// CARD ACTIONS
// ════════════════════════════════════════════════════════════════
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch(e) {
    const ta = document.createElement('textarea'); ta.value = text;
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); document.body.removeChild(ta); return true; }
    catch(_) { document.body.removeChild(ta); return false; }
  }
}

async function copyCode(id, btn) {
  const sn = snippets.find(s => s.id === id);
  if (!sn) return;
  const ok = await copyText(sn.code);
  if (!ok) { showToast('Copy failed', 'error'); return; }
  if (btn) {
    btn.classList.add('copied');
    const prev = btn.innerHTML;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = prev; }, 1500);
  }
  showToast('Code copied', 'success');
}

function titleToFilename(title) {
  const slug = (title || 'snippet').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return (slug || 'snippet') + '.cpp';
}

function downloadCpp(id) {
  const sn = snippets.find(s => s.id === id);
  if (!sn) return;
  const blob = new Blob([sn.code], { type: 'text/x-c++src' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = titleToFilename(sn.title);
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${a.download}`, 'success');
}

// ════════════════════════════════════════════════════════════════
// DELETE
// ════════════════════════════════════════════════════════════════
function askDelete(id, title) {
  pendingDeleteId = id;
  document.getElementById('confirm-name').textContent = `"${title}"`;
  document.getElementById('confirm-modal').classList.add('open');
}
function closeConfirm() { pendingDeleteId = null; document.getElementById('confirm-modal').classList.remove('open'); }
function confirmDelete() {
  if (!pendingDeleteId) return;
  snippets = snippets.filter(s => s.id !== pendingDeleteId);
  save(); renderAll(); closeConfirm();
  showToast('Snippet deleted', 'success');
}

// ════════════════════════════════════════════════════════════════
// ADD / EDIT MODAL
// ════════════════════════════════════════════════════════════════
function openAdd() {
  editingId = null;
  editingCustomTags = [];
  document.getElementById('modal-title-text').textContent = 'New Snippet';
  document.getElementById('save-btn-text').textContent = 'Save Snippet';
  document.getElementById('f-title').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-code').value = '';
  document.getElementById('tag-input').value = '';
  document.getElementById('custom-tags-list').innerHTML = '';
  document.getElementById('auto-detect').classList.remove('visible');
  document.getElementById('add-modal').classList.add('open');
  setTimeout(() => document.getElementById('f-title').focus(), 80);
}

function openEdit(id) {
  const sn = snippets.find(s => s.id === id);
  if (!sn) return;
  editingId = id;
  editingCustomTags = [...(sn.customTags||[])];
  document.getElementById('modal-title-text').textContent = 'Edit Snippet';
  document.getElementById('save-btn-text').textContent = 'Update Snippet';
  document.getElementById('f-title').value = sn.title;
  document.getElementById('f-desc').value = sn.description;
  document.getElementById('f-code').value = sn.code;
  document.getElementById('tag-input').value = '';
  renderCustomTagList();
  liveAnalyze();
  document.getElementById('add-modal').classList.add('open');
  setTimeout(() => document.getElementById('f-title').focus(), 80);
}

function closeAdd() { document.getElementById('add-modal').classList.remove('open'); }

function liveAnalyze() {
  const code = document.getElementById('f-code').value;
  const panel = document.getElementById('auto-detect');
  if (code.trim().length < 15) { panel.classList.remove('visible'); return; }
  const r = analyzeCode(code);
  const def = RULES[r.primary];
  const badge = document.getElementById('detect-section');
  badge.className = `badge ${def.badge}`;
  badge.textContent = def.label;
  const tc = document.getElementById('detect-tags');
  tc.innerHTML = '';
  if (r.tags.length === 0) {
    tc.innerHTML = '<span style="font-size:11px;color:var(--muted2)">none yet</span>';
  } else {
    r.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tc.appendChild(span);
    });
  }
  panel.classList.add('visible');
}

function addCustomTag() {
  const inp = document.getElementById('tag-input');
  const t = inp.value.trim().toLowerCase().replace(/\s+/g, '-');
  if (!t || editingCustomTags.includes(t)) { inp.value = ''; return; }
  editingCustomTags.push(t); inp.value = ''; renderCustomTagList();
}
function removeCustomTag(t) { editingCustomTags = editingCustomTags.filter(x => x !== t); renderCustomTagList(); }
function renderCustomTagList() {
  const host = document.getElementById('custom-tags-list');
  host.innerHTML = '';
  editingCustomTags.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tag custom';
    btn.innerHTML = `<svg class="ico" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>${escapeHTML(t)}`;
    btn.addEventListener('click', () => removeCustomTag(t));
    host.appendChild(btn);
  });
}

function saveSnippet() {
  const title = document.getElementById('f-title').value.trim();
  const code = document.getElementById('f-code').value.trim();
  if (!title || !code) { showToast('Title and Code are required', 'error'); return; }
  const r = analyzeCode(code);
  const desc = document.getElementById('f-desc').value.trim() || 'No description provided.';

  if (editingId) {
    const idx = snippets.findIndex(s => s.id === editingId);
    if (idx >= 0) {
      snippets[idx] = { ...snippets[idx], title, description: desc, code,
        section: r.primary, tags: r.tags, customTags: [...editingCustomTags] };
    }
    showToast('Snippet updated', 'success');
  } else {
    snippets.unshift({
      id: 'sn_' + Date.now(), title, description: desc, code,
      section: r.primary, tags: r.tags, customTags: [...editingCustomTags], createdAt: Date.now()
    });
    showToast('Snippet saved', 'success');
  }
  save(); renderAll(); closeAdd();
}

// ════════════════════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════════════════════
function openSearch() {
  document.getElementById('search-modal').classList.add('open');
  setTimeout(() => document.getElementById('search-input').focus(), 60);
  renderSearch();
}
function closeSearch() {
  document.getElementById('search-modal').classList.remove('open');
  document.getElementById('search-input').value = '';
}
function renderSearch() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  const pool = q ? snippets.filter(s =>
    s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) ||
    s.code.toLowerCase().includes(q) || s.tags.some(t => t.includes(q)) ||
    (s.customTags||[]).some(t => t.includes(q))
  ) : snippets.slice(0, 10);
  const el = document.getElementById('search-results');
  el.innerHTML = '';
  if (pool.length === 0) {
    el.innerHTML = `<div class="search-empty">No matches found</div>`;
    return;
  }
  pool.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'search-item';
    btn.innerHTML = `
      <svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <div class="search-item-info">
        <div class="search-item-title">${escapeHTML(s.title)}</div>
        <div class="search-item-file">${escapeHTML(s.description)}</div>
      </div>
      <span class="badge ${sectionBadge(s.section)}">${escapeHTML(sectionLabel(s.section))}</span>`;
    btn.addEventListener('click', () => jumpTo(s.id));
    el.appendChild(btn);
  });
}
function jumpTo(id) {
  const sn = snippets.find(s => s.id === id);
  if (sn) { activeSection = sn.section; activeTags = []; renderAll(); }
  closeSearch();
  setTimeout(() => openDetail(id), 50);
}

// ════════════════════════════════════════════════════════════════
// DETAIL MODAL
// ════════════════════════════════════════════════════════════════
function openDetail(id) {
  const sn = snippets.find(s => s.id === id);
  if (!sn) return;
  document.getElementById('detail-title').textContent = sn.title;
  document.getElementById('detail-desc').textContent = sn.description;
  document.getElementById('detail-section').className = `badge ${sectionBadge(sn.section)}`;
  document.getElementById('detail-section').textContent = sectionLabel(sn.section);
  document.getElementById('detail-lines').textContent = `${countLines(sn.code)} lines`;
  document.getElementById('detail-time').textContent = formatRelativeTime(sn.createdAt);
  document.getElementById('detail-code').innerHTML = hl(sn.code);
  document.getElementById('detail-modal').dataset.id = id;
  document.getElementById('detail-modal').classList.add('open');
}
function closeDetail() { document.getElementById('detail-modal').classList.remove('open'); }

// ════════════════════════════════════════════════════════════════
// STUDY MODE (Spaced Repetition — SM-2 lite)
// ════════════════════════════════════════════════════════════════
const DAY_MS = 86400000;

let studyQueue = [];
let studyIndex = 0;
let sessionStats = { correct: 0, hard: 0, wrong: 0, tagErrors: {} };

function ensureStudyData(sn) {
  if (!sn.study) {
    sn.study = { ease: 2.5, interval: 0, nextReview: Date.now(), correct: 0, hard: 0, wrong: 0, reviews: 0, lastReview: null };
  }
  if (sn.study.hard === undefined) sn.study.hard = 0;
  return sn.study;
}

// Weighted accuracy from one study record (Got it = 1, Hard = 0.5, Wrong = 0).
function studyAccuracy(st) {
  if (!st) return null;
  const total = (st.correct || 0) + (st.hard || 0) + (st.wrong || 0);
  if (total === 0) return null;
  const score = (st.correct || 0) + (st.hard || 0) * 0.5;
  return score / total;
}

function dueSnippets() {
  const now = Date.now();
  return snippets.filter(sn => {
    const st = sn.study;
    return !st || st.nextReview <= now;
  });
}

function updateDueCount() {
  const n = dueSnippets().length;
  const el = document.getElementById('due-cnt');
  if (el) {
    el.textContent = n;
    el.classList.toggle('zero', n === 0);
  }
}

function scheduleNext(sn, rating) {
  const st = ensureStudyData(sn);
  st.reviews++;
  st.lastReview = Date.now();
  if (rating === 'wrong') {
    st.wrong++;
    st.ease = Math.max(1.3, st.ease - 0.2);
    st.interval = 1;
  } else if (rating === 'hard') {
    st.hard++;
    st.ease = Math.max(1.3, st.ease - 0.05);
    st.interval = st.interval === 0 ? 2 : Math.max(2, Math.round(st.interval * 1.4));
  } else { // good
    st.correct++;
    st.ease = Math.min(2.8, st.ease + 0.1);
    st.interval = st.interval === 0 ? 4 : Math.round(st.interval * st.ease);
  }
  st.nextReview = Date.now() + st.interval * DAY_MS;
}

function previewInterval(sn, rating) {
  const st = sn.study || { ease: 2.5, interval: 0 };
  if (rating === 'wrong') return 1;
  if (rating === 'hard') return st.interval === 0 ? 2 : Math.max(2, Math.round(st.interval * 1.4));
  return st.interval === 0 ? 4 : Math.round(st.interval * st.ease);
}

function fmtDays(d) { return d === 1 ? '1 day' : `${d} days`; }

function masteryLevel(sn) {
  const st = sn.study;
  if (!st || st.reviews === 0) return { level: 0, pct: 0 };
  const acc = studyAccuracy(st) || 0;       // weighted: hard counts half
  const reviewBoost = Math.min(1, st.reviews / 5);
  const score = acc * 0.7 + reviewBoost * 0.3;
  const pct = Math.round(score * 100);
  let level = 0;
  if (pct >= 75) level = 3;
  else if (pct >= 50) level = 2;
  else if (pct >= 25) level = 1;
  return { level, pct };
}

// ── Code-attempt evaluator ────────────────────────────────────
// Compares user's attempt with the reference snippet.
// Returns { score, rating, suggested, matched, missed, extra, components }
function extractConceptTags(code) {
  const tags = new Set();
  for (const def of Object.values(RULES)) {
    for (const rule of def.rules) {
      if (rule.pat.some(p => p.test(code))) tags.add(rule.tag);
    }
  }
  if (countExternalFunctions(code) > 0) tags.add('functions');
  return tags;
}

function extractKeywordSet(code) {
  const set = new Set();
  const matches = code.match(/\b[a-zA-Z_]\w*\b/g) || [];
  matches.forEach(t => {
    if (KW.includes(t) || TY.includes(t)) set.add(t);
  });
  return set;
}

function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  a.forEach(x => { if (b.has(x)) inter++; });
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function evaluateAttempt(userCode, refCode) {
  const refTags = extractConceptTags(refCode);
  const userTags = extractConceptTags(userCode);
  const matched = [...refTags].filter(t => userTags.has(t));
  const missed = [...refTags].filter(t => !userTags.has(t));
  const extra = [...userTags].filter(t => !refTags.has(t));
  const conceptScore = refTags.size === 0 ? 100 : (matched.length / refTags.size) * 100;

  const refKw = extractKeywordSet(refCode);
  const userKw = extractKeywordSet(userCode);
  const tokenScore = jaccard(refKw, userKw) * 100;

  const lenR = refCode.trim().length || 1;
  const lenU = userCode.trim().length || 1;
  const lengthRatio = Math.min(lenR, lenU) / Math.max(lenR, lenU);
  const lengthScore = lengthRatio * 100;

  const score = Math.round(conceptScore * 0.55 + tokenScore * 0.30 + lengthScore * 0.15);

  let rating, suggested;
  if (score >= 80)      { rating = 'Excellent'; suggested = 'good';  }
  else if (score >= 60) { rating = 'Good';      suggested = 'good';  }
  else if (score >= 35) { rating = 'Partial';   suggested = 'hard';  }
  else                  { rating = 'Needs practice'; suggested = 'wrong'; }

  return {
    score, rating, suggested, matched, missed, extra,
    components: {
      concept: Math.round(conceptScore),
      tokens:  Math.round(tokenScore),
      length:  Math.round(lengthScore),
    }
  };
}

function ratingClass(rating) {
  if (rating === 'Excellent') return 'excellent';
  if (rating === 'Good') return 'good';
  if (rating === 'Partial') return 'partial';
  return 'weak';
}

function scoreColor(score) {
  if (score >= 80) return 'var(--green)';
  if (score >= 60) return 'var(--cyan)';
  if (score >= 35) return 'var(--orange)';
  return 'var(--red)';
}

function checkAttempt() {
  const sn = studyQueue[studyIndex];
  if (!sn) return;
  const userCode = document.getElementById('study-attempt').value;
  if (userCode.trim().length < 3) {
    showToast('Type some code first, or use Reveal', 'error');
    return;
  }
  const ev = evaluateAttempt(userCode, sn.code);

  // Reveal answer panel with analysis
  document.getElementById('study-prompt').style.display = 'none';
  document.getElementById('study-answer').style.display = 'block';
  document.getElementById('study-analysis').style.display = 'block';
  document.getElementById('study-plain-answer').style.display = 'none';

  // Score ring
  const offset = 263.9 * (1 - ev.score / 100);
  const arc = document.getElementById('score-arc');
  arc.style.stroke = scoreColor(ev.score);
  arc.style.strokeDashoffset = offset;
  document.getElementById('score-num').textContent = ev.score + '%';
  document.getElementById('score-num').style.color = scoreColor(ev.score);

  const ratingEl = document.getElementById('score-rating');
  ratingEl.textContent = ev.rating;
  ratingEl.className = 'score-rating ' + ratingClass(ev.rating);
  document.getElementById('score-sub').textContent =
    `Concepts ${ev.components.concept}% · Keywords ${ev.components.tokens}% · Length ${ev.components.length}%`;

  // Concept badges
  const renderTags = (host, list, cls) => {
    host.innerHTML = '';
    if (list.length === 0) {
      host.innerHTML = '<span style="font-size:11px;color:var(--muted2)">none</span>';
      return;
    }
    list.forEach(t => {
      const span = document.createElement('span');
      span.className = `tag ${cls}`;
      span.textContent = t;
      host.appendChild(span);
    });
  };
  renderTags(document.getElementById('ct-matched'), ev.matched, 'ok');
  renderTags(document.getElementById('ct-missed'),  ev.missed,  'bad');
  if (ev.extra.length > 0) {
    document.getElementById('cg-extra').style.display = 'block';
    renderTags(document.getElementById('ct-extra'), ev.extra, 'warn');
  } else {
    document.getElementById('cg-extra').style.display = 'none';
  }

  // Side-by-side code
  document.getElementById('study-user-code').innerHTML = hl(userCode);
  document.getElementById('study-ref-code').innerHTML = hl(sn.code);

  // Suggest rating button
  document.querySelectorAll('.rate-btn').forEach(b => {
    b.classList.toggle('suggested', b.dataset.rating === ev.suggested);
  });

  // Pre-load missed concepts into session weak-point tracker
  // (counted with weight 0.5 — final confirmation happens when user clicks rate)
  studyQueue[studyIndex]._lastEval = ev;
}

let sessionFilter = { section: 'all', tag: null };

function openStudy() {
  if (snippets.length === 0) {
    showToast('Add some snippets first', 'error');
    return;
  }
  document.getElementById('study-picker').style.display = 'block';
  document.getElementById('study-empty').style.display = 'none';
  document.getElementById('study-card').style.display = 'none';
  document.getElementById('study-done').style.display = 'none';
  document.getElementById('study-progress').style.display = 'none';
  renderPicker();
  document.getElementById('study-modal').classList.add('open');
}

function renderPicker() {
  const now = Date.now();
  const sectionTotal = { all: snippets.length, basics:0, 'data-structures':0, functions:0 };
  const sectionDue = { all: 0, basics:0, 'data-structures':0, functions:0 };
  const tagTotal = {};
  const tagDue = {};

  snippets.forEach(sn => {
    sectionTotal[sn.section] = (sectionTotal[sn.section] || 0) + 1;
    const isDue = !sn.study || sn.study.nextReview <= now;
    if (isDue) {
      sectionDue.all++;
      sectionDue[sn.section] = (sectionDue[sn.section] || 0) + 1;
    }
    [...sn.tags, ...(sn.customTags||[])].forEach(t => {
      tagTotal[t] = (tagTotal[t] || 0) + 1;
      if (isDue) tagDue[t] = (tagDue[t] || 0) + 1;
    });
  });

  const sectEl = document.getElementById('picker-sections');
  sectEl.innerHTML = '';
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'basics', label: 'Basics' },
    { id: 'data-structures', label: 'Data Structures' },
    { id: 'functions', label: 'Functions' },
  ];
  sections.forEach(s => {
    const total = sectionTotal[s.id] || 0;
    const due = sectionDue[s.id] || 0;
    const btn = document.createElement('button');
    btn.className = 'picker-chip section-chip' + (total === 0 ? ' disabled' : '');
    btn.innerHTML = `<span class="pc-label">${s.label}</span><span class="pc-count">${due} / ${total}</span>`;
    if (total > 0) btn.addEventListener('click', () => startStudyWithFilter(s.id, null));
    sectEl.appendChild(btn);
  });

  const tagEl = document.getElementById('picker-tags');
  tagEl.innerHTML = '';
  const sorted = Object.entries(tagTotal).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) {
    tagEl.innerHTML = '<span style="color:var(--muted2);font-size:12px">No tags yet</span>';
  }
  sorted.forEach(([t, count]) => {
    const due = tagDue[t] || 0;
    const btn = document.createElement('button');
    btn.className = 'picker-chip';
    btn.innerHTML = `<span class="pc-label">${escapeHTML(t)}</span><span class="pc-count">${due} / ${count}</span>`;
    btn.addEventListener('click', () => startStudyWithFilter(null, t));
    tagEl.appendChild(btn);
  });
}

function startStudyWithFilter(section, tag) {
  const onlyDue = document.getElementById('due-only-cb').checked;
  const now = Date.now();
  let pool = snippets.filter(sn => {
    if (section && section !== 'all' && sn.section !== section) return false;
    if (tag && ![...sn.tags, ...(sn.customTags||[])].includes(tag)) return false;
    if (onlyDue) {
      const isDue = !sn.study || sn.study.nextReview <= now;
      if (!isDue) return false;
    }
    return true;
  });

  if (pool.length === 0) {
    if (onlyDue) {
      showToast('No due cards — try unchecking "Only due cards"', 'error');
    } else {
      showToast('No cards match this filter', 'error');
    }
    return;
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  studyQueue = pool;
  studyIndex = 0;
  sessionFilter = { section: section || (tag ? null : 'all'), tag };
  sessionStats = { correct: 0, hard: 0, wrong: 0, tagErrors: {} };

  document.getElementById('study-picker').style.display = 'none';
  document.getElementById('study-empty').style.display = 'none';
  document.getElementById('study-done').style.display = 'none';
  document.getElementById('study-card').style.display = 'block';
  document.getElementById('study-progress').style.display = 'inline-flex';
  showStudyCard();
}

function closeStudy() {
  document.getElementById('study-modal').classList.remove('open');
}

function showStudyCard() {
  if (studyIndex >= studyQueue.length) { finishStudy(); return; }
  const sn = studyQueue[studyIndex];
  ensureStudyData(sn);
  document.getElementById('study-progress').textContent = `${studyIndex + 1} / ${studyQueue.length}`;
  document.getElementById('study-section').className = `badge ${sectionBadge(sn.section)}`;
  document.getElementById('study-section').textContent = sectionLabel(sn.section);

  const st = sn.study;
  const streak = document.getElementById('study-streak');
  if (st.reviews === 0) {
    streak.innerHTML = '<span style="color:var(--cyan)">✦ New card</span>';
  } else {
    const accFrac = studyAccuracy(st);
    const acc = accFrac === null ? 0 : Math.round(accFrac * 100);
    const hot = acc >= 75 ? 'hot' : '';
    streak.innerHTML = `Reviewed ${st.reviews}× · <span class="${hot}">${acc}% accuracy</span>`;
  }

  document.getElementById('study-title').textContent = sn.title;
  document.getElementById('study-desc').textContent = sn.description;

  const tagsHost = document.getElementById('study-tags');
  tagsHost.innerHTML = '';
  [...sn.tags, ...(sn.customTags||[])].forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag' + ((sn.customTags||[]).includes(t) ? ' custom' : '');
    span.textContent = t;
    tagsHost.appendChild(span);
  });

  // update interval hints
  document.getElementById('hint-hard').textContent = fmtDays(previewInterval(sn, 'hard'));
  document.getElementById('hint-good').textContent = fmtDays(previewInterval(sn, 'good'));

  document.getElementById('study-prompt').style.display = 'block';
  document.getElementById('study-answer').style.display = 'none';
  document.getElementById('study-analysis').style.display = 'none';
  document.getElementById('study-plain-answer').style.display = 'block';
  document.getElementById('study-attempt').value = '';
  document.querySelectorAll('.rate-btn').forEach(b => b.classList.remove('suggested'));
  document.getElementById('study-code').innerHTML = hl(sn.code);
}

function revealAnswer() {
  document.getElementById('study-prompt').style.display = 'none';
  document.getElementById('study-answer').style.display = 'block';
  document.getElementById('study-analysis').style.display = 'none';
  document.getElementById('study-plain-answer').style.display = 'block';
}

function rateCard(rating) {
  const sn = studyQueue[studyIndex];
  if (!sn) return;
  scheduleNext(sn, rating);

  // Concept-level error tracking — prefer the code-attempt analysis when available
  const ev = sn._lastEval;
  if (rating === 'wrong') {
    sessionStats.wrong++;
    const errTags = ev ? ev.missed : [...sn.tags, ...(sn.customTags||[])];
    errTags.forEach(t => { sessionStats.tagErrors[t] = (sessionStats.tagErrors[t] || 0) + 1; });
  } else if (rating === 'hard') {
    sessionStats.hard++;
    if (ev) ev.missed.forEach(t => { sessionStats.tagErrors[t] = (sessionStats.tagErrors[t] || 0) + 0.5; });
  } else {
    sessionStats.correct++;
    // Even on "got it", record any concepts they actually missed in their typed attempt
    if (ev) ev.missed.forEach(t => { sessionStats.tagErrors[t] = (sessionStats.tagErrors[t] || 0) + 0.25; });
  }

  delete sn._lastEval;
  save();
  studyIndex++;
  showStudyCard();
}

function finishStudy() {
  document.getElementById('study-card').style.display = 'none';
  document.getElementById('study-done').style.display = 'block';
  const total = sessionStats.correct + sessionStats.hard + sessionStats.wrong;
  document.getElementById('session-stats').innerHTML = `
    <div class="session-stat"><div class="session-stat-val" style="color:var(--green)">${sessionStats.correct}</div><div class="session-stat-lbl">Got it</div></div>
    <div class="session-stat"><div class="session-stat-val" style="color:var(--orange)">${sessionStats.hard}</div><div class="session-stat-lbl">Hard</div></div>
    <div class="session-stat"><div class="session-stat-val" style="color:var(--red)">${sessionStats.wrong}</div><div class="session-stat-lbl">Wrong</div></div>
    <div class="session-stat"><div class="session-stat-val" style="color:var(--cyan)">${total}</div><div class="session-stat-lbl">Total</div></div>
  `;
  const weakHost = document.getElementById('weak-tags-host');
  const tagEntries = Object.entries(sessionStats.tagErrors).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (tagEntries.length === 0) {
    weakHost.innerHTML = '<p style="color:var(--muted);font-size:13px">Perfect session — no weak areas!</p>';
  } else {
    const maxErr = tagEntries[0][1];
    const rows = tagEntries.map(([tag, err]) => {
      const pct = Math.round((err / maxErr) * 100);
      return `<div class="weak-tag-row">
        <span class="tag">${escapeHTML(tag)}</span>
        <div class="weak-tag-bar"><div class="weak-tag-fill" style="width:${pct}%"></div></div>
        <span class="weak-tag-pct">${err} miss${err === 1 ? '' : 'es'}</span>
      </div>`;
    }).join('');
    weakHost.innerHTML = `<div class="weak-tags-panel">
      <div class="weak-tags-head">⚠ Focus areas — review these tags</div>
      ${rows}
    </div>`;
  }
  updateDueCount();
}

// ════════════════════════════════════════════════════════════════
// STATS PANEL
// ════════════════════════════════════════════════════════════════
function openStats() {
  const body = document.getElementById('stats-body');
  const total = snippets.length;
  const reviewed = snippets.filter(s => s.study && s.study.reviews > 0).length;
  const due = dueSnippets().length;

  // Weighted accuracy: Got it = 1, Hard = 0.5, Wrong = 0
  let totalReviews = 0, weightedScore = 0;
  let totGood = 0, totHard = 0, totWrong = 0;
  snippets.forEach(s => {
    if (!s.study) return;
    totalReviews += s.study.reviews || 0;
    weightedScore += (s.study.correct || 0) + (s.study.hard || 0) * 0.5;
    totGood  += s.study.correct || 0;
    totHard  += s.study.hard || 0;
    totWrong += s.study.wrong || 0;
  });
  const overallAcc = totalReviews === 0 ? 0 : Math.round((weightedScore / totalReviews) * 100);

  // tag accuracy — per-snippet weighted score distributed across its tags
  const tagStats = {};
  snippets.forEach(sn => {
    if (!sn.study || sn.study.reviews === 0) return;
    const reviews = sn.study.reviews;
    const score   = (sn.study.correct || 0) + (sn.study.hard || 0) * 0.5;
    [...sn.tags, ...(sn.customTags||[])].forEach(t => {
      if (!tagStats[t]) tagStats[t] = { score: 0, total: 0 };
      tagStats[t].score += score;
      tagStats[t].total += reviews;
    });
  });
  const weakTags = Object.entries(tagStats)
    .map(([t, s]) => ({ tag: t, acc: s.total === 0 ? 100 : Math.round((s.score / s.total) * 100), total: s.total }))
    .filter(x => x.total >= 2)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 6);

  // mastery list
  const mastery = snippets
    .map(sn => ({ sn, m: masteryLevel(sn) }))
    .sort((a, b) => a.m.pct - b.m.pct);

  // Section accuracy — weighted (Got it = 1, Hard = 0.5, Wrong = 0)
  const secAcc = { basics: {s:0,t:0}, 'data-structures': {s:0,t:0}, functions: {s:0,t:0} };
  snippets.forEach(sn => {
    if (!sn.study || sn.study.reviews === 0) return;
    const a = secAcc[sn.section]; if (!a) return;
    a.s += (sn.study.correct||0) + (sn.study.hard||0)*0.5;
    a.t += sn.study.reviews;
  });
  const secLevels = a => {
    const pct = a.t === 0 ? 0 : Math.round((a.s / a.t) * 100);
    let lvl = 0;
    if (pct >= 75) lvl = 3; else if (pct >= 50) lvl = 2; else if (pct >= 25) lvl = 1;
    return { pct, lvl };
  };
  const secOrder = [
    { id: 'basics', label: 'Basics' },
    { id: 'data-structures', label: 'Data Structures' },
    { id: 'functions', label: 'Functions' },
  ];
  const secRows = secOrder
    .filter(s => secAcc[s.id].t > 0)
    .map(s => {
      const { pct, lvl } = secLevels(secAcc[s.id]);
      return `
        <div class="mastery-row">
          <span class="m-title">${escapeHTML(s.label)}</span>
          <div class="m-bar"><div class="m-fill lvl-${lvl}" style="width:${pct}%"></div></div>
          <span class="m-pct">${pct}%</span>
        </div>`;
    }).join('');

  const masteryRows = mastery.slice(0, 10).map(({ sn, m }) => `
    <div class="mastery-row">
      <span class="m-title">${escapeHTML(sn.title)}</span>
      <div class="m-bar"><div class="m-fill lvl-${m.level}" style="width:${m.pct}%"></div></div>
      <span class="m-pct">${m.pct}%</span>
    </div>`).join('');

  const weakRows = weakTags.length === 0
    ? '<p style="color:var(--muted);font-size:13px">Study more snippets to see tag-level stats.</p>'
    : weakTags.map(w => `
      <div class="weak-tag-row">
        <span class="tag">${escapeHTML(w.tag)}</span>
        <div class="weak-tag-bar"><div class="weak-tag-fill" style="width:${100 - w.acc}%"></div></div>
        <span class="weak-tag-pct">${w.acc}%</span>
      </div>`).join('');

  body.innerHTML = `
    <div class="stats-grid">
      <div class="stats-card"><div class="stats-card-val" style="color:var(--cyan)">${total}</div><div class="stats-card-lbl">Total Snippets</div></div>
      <div class="stats-card"><div class="stats-card-val" style="color:var(--violet)">${reviewed}</div><div class="stats-card-lbl">Reviewed</div></div>
      <div class="stats-card"><div class="stats-card-val" style="color:var(--orange)">${due}</div><div class="stats-card-lbl">Due now</div></div>
      <div class="stats-card">
        <div class="stats-card-val" style="color:var(--green)">${overallAcc}%</div>
        <div class="stats-card-lbl">Accuracy <span class="acc-tip" title="Got it = 100% · Hard = 50% · Wrong = 0%">ⓘ</span></div>
      </div>
    </div>

    <div class="rating-breakdown">
      <div class="rb-item"><span class="rb-dot" style="background:var(--green)"></span><span class="rb-num">${totGood}</span><span class="rb-lbl">Got it</span></div>
      <div class="rb-item"><span class="rb-dot" style="background:var(--orange)"></span><span class="rb-num">${totHard}</span><span class="rb-lbl">Hard</span></div>
      <div class="rb-item"><span class="rb-dot" style="background:var(--red)"></span><span class="rb-num">${totWrong}</span><span class="rb-lbl">Wrong</span></div>
      <div class="rb-item rb-total"><span class="rb-num">${totalReviews}</span><span class="rb-lbl">Total reviews</span></div>
    </div>

    <div class="stats-section">
      <div class="stats-section-title">📂 Accuracy by section</div>
      <div class="mastery-list">${secRows || '<p style="color:var(--muted);font-size:13px">No section data yet — start a study session.</p>'}</div>
    </div>

    <div class="stats-section">
      <div class="stats-section-title">⚠ Weakest tags</div>
      ${weakRows}
    </div>

    <div class="stats-section">
      <div class="stats-section-title">📚 Mastery (lowest first)</div>
      <div class="mastery-list">${masteryRows || '<p style="color:var(--muted);font-size:13px">No data yet.</p>'}</div>
    </div>
  `;
  document.getElementById('stats-modal').classList.add('open');
}
function closeStats() { document.getElementById('stats-modal').classList.remove('open'); }

// ════════════════════════════════════════════════════════════════
// EXPORT / IMPORT
// ════════════════════════════════════════════════════════════════
function exportData() {
  const blob = new Blob([JSON.stringify({ version: 3, exportedAt: new Date().toISOString(), snippets }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cpp-archive-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Exported ${snippets.length} snippets`, 'success');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      const incoming = Array.isArray(data) ? data : data.snippets;
      if (!Array.isArray(incoming)) throw new Error('Invalid file');
      const existingIds = new Set(snippets.map(s => s.id));
      let added = 0;
      incoming.forEach(sn => {
        if (!sn.id || !sn.title || !sn.code) return;
        if (existingIds.has(sn.id)) sn.id = 'sn_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
        snippets.unshift({
          id: sn.id, title: String(sn.title), description: String(sn.description||''),
          code: String(sn.code),
          section: sn.section || 'basics', tags: Array.isArray(sn.tags) ? sn.tags : [],
          customTags: Array.isArray(sn.customTags) ? sn.customTags : [],
          createdAt: sn.createdAt || Date.now(),
          study: sn.study || undefined
        });
        added++;
      });
      save(); renderAll();
      showToast(`Imported ${added} snippets`, 'success');
    } catch(err) {
      showToast('Import failed: invalid JSON', 'error');
    }
  };
  reader.readAsText(file);
}

// ════════════════════════════════════════════════════════════════
// STORAGE METER
// ════════════════════════════════════════════════════════════════
function updateStorageMeter() {
  const bytes = new Blob([JSON.stringify(snippets)]).size;
  const pct = Math.min(100, (bytes / STORAGE_LIMIT) * 100);
  const fill = document.getElementById('storage-fill');
  const text = document.getElementById('storage-text');
  if (!fill || !text) return;
  fill.style.width = pct + '%';
  fill.classList.toggle('warn', pct > 60 && pct <= 85);
  fill.classList.toggle('crit', pct > 85);
  text.innerHTML = `<span>${formatBytes(bytes)}</span><span>${pct.toFixed(1)}%</span>`;
}

// ════════════════════════════════════════════════════════════════
// THEME
// ════════════════════════════════════════════════════════════════
function applyTheme(t) {
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = t === 'light' ? '☀' : '☾';
}
function toggleTheme() {
  const cur = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  const next = cur === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

const VALID_ACCENTS = ['cyan','violet','pink','green','orange','red'];
function applyAccent(a) {
  if (!VALID_ACCENTS.includes(a)) a = 'cyan';
  if (a === 'cyan') document.documentElement.removeAttribute('data-accent');
  else document.documentElement.setAttribute('data-accent', a);
  document.querySelectorAll('.swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.accent === a);
  });
}
function setAccent(a) {
  localStorage.setItem(ACCENT_KEY, a);
  applyAccent(a);
}

// ════════════════════════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.className = 'toast' + (type ? ' ' + type : '') + ' show';
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ════════════════════════════════════════════════════════════════
// WIRE-UP
// ════════════════════════════════════════════════════════════════
function init() {
  applyTheme(localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark');
  applyAccent(localStorage.getItem(ACCENT_KEY) || 'cyan');
  load();
  renderAll();
  updateStorageMeter();
  updateDueCount();

  // sidebar nav
  document.getElementById('nav-all').addEventListener('click', () => setSection('all'));
  document.getElementById('nav-basics').addEventListener('click', () => setSection('basics'));
  document.getElementById('nav-ds').addEventListener('click', () => setSection('data-structures'));
  document.getElementById('nav-fn').addEventListener('click', () => setSection('functions'));

  // top buttons
  document.querySelectorAll('[data-action="add"]').forEach(b => b.addEventListener('click', openAdd));
  document.getElementById('open-search').addEventListener('click', openSearch);
  document.getElementById('clear-tags-btn').addEventListener('click', clearTagFilters);
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files[0]) importData(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
  document.querySelectorAll('#palette-row .swatch').forEach(sw => {
    sw.addEventListener('click', () => setAccent(sw.dataset.accent));
  });
  document.getElementById('sort-select').addEventListener('change', e => { sortMode = e.target.value; renderGrid(); });

  // mobile
  document.getElementById('mob-menu').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
  document.getElementById('mob-add').addEventListener('click', openAdd);

  // add modal
  document.getElementById('add-close').addEventListener('click', closeAdd);
  document.getElementById('add-cancel').addEventListener('click', closeAdd);
  document.getElementById('add-save').addEventListener('click', saveSnippet);
  document.getElementById('f-code').addEventListener('input', liveAnalyze);
  document.getElementById('tag-add-btn').addEventListener('click', addCustomTag);
  document.getElementById('tag-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); }
  });

  // search modal
  document.getElementById('search-input').addEventListener('input', renderSearch);
  document.getElementById('search-close').addEventListener('click', closeSearch);

  // confirm modal
  document.getElementById('confirm-cancel').addEventListener('click', closeConfirm);
  document.getElementById('confirm-ok').addEventListener('click', confirmDelete);

  // detail modal
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-copy').addEventListener('click', () => {
    const id = document.getElementById('detail-modal').dataset.id;
    if (id) copyCode(id);
  });
  document.getElementById('detail-edit').addEventListener('click', () => {
    const id = document.getElementById('detail-modal').dataset.id;
    closeDetail();
    if (id) openEdit(id);
  });

  // study mode
  document.getElementById('study-btn').addEventListener('click', openStudy);
  document.getElementById('study-close').addEventListener('click', closeStudy);
  document.getElementById('study-all-btn').addEventListener('click', openStudy);
  document.getElementById('study-reveal').addEventListener('click', revealAnswer);
  document.getElementById('study-check').addEventListener('click', checkAttempt);
  document.getElementById('study-attempt').addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); checkAttempt(); }
    // Tab inserts two spaces inside the editor
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + 2;
    }
  });
  document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', () => rateCard(btn.dataset.rating));
  });

  // stats
  document.getElementById('stats-btn').addEventListener('click', openStats);
  document.getElementById('stats-close').addEventListener('click', closeStats);

  // overlay click-to-close
  ['add-modal','search-modal','confirm-modal','detail-modal','study-modal','stats-modal'].forEach(id => {
    const m = document.getElementById(id);
    m.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('open'); });
  });

  // keyboard
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('search-modal').classList.contains('open') ? closeSearch() : openSearch();
      return;
    }
    if (e.key === 'Escape') {
      closeSearch(); closeAdd(); closeConfirm(); closeDetail(); closeStudy(); closeStats();
      return;
    }
    // Study modal keyboard shortcuts
    if (document.getElementById('study-modal').classList.contains('open') && !isTyping) {
      const ansVisible = document.getElementById('study-answer').style.display === 'block';
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!ansVisible && document.getElementById('study-card').style.display === 'block') revealAnswer();
        return;
      }
      if (ansVisible) {
        if (e.key === '1') { rateCard('wrong'); return; }
        if (e.key === '2') { rateCard('hard'); return; }
        if (e.key === '3') { rateCard('good'); return; }
      }
      return; // block other shortcuts while study modal open
    }
    if (!isTyping && !e.metaKey && !e.ctrlKey && !e.altKey) {
      if (e.key === '1') setSection('all');
      else if (e.key === '2') setSection('basics');
      else if (e.key === '3') setSection('data-structures');
      else if (e.key === '4') setSection('functions');
      else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); openAdd(); }
      else if (e.key === 't' || e.key === 'T') toggleTheme();
      else if (e.key === 's' || e.key === 'S') { e.preventDefault(); openStudy(); }
    }
  });

  // refresh relative times every minute — without DOM rebuild
  setInterval(refreshTimes, 60000);
}

// expose for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { escapeHTML, formatRelativeTime, countLines, formatBytes, analyzeCode };
} else {
  window.__archive = { escapeHTML, formatRelativeTime, countLines, formatBytes, analyzeCode };
}

document.addEventListener('DOMContentLoaded', init);
