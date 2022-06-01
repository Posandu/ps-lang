# ps lang
Simple interpreter written in JavaScript.

## Docs

### Usage

```shell
node index filename.ps
```

### Comments

```c
# This is a comment I'm writing #
```

### Push to stack

```c
!42
```

`!(integer)`

### Remove an element from the stack (index)

```c
%0
```

`!(index)`

### Remove an element from the stack (exact value)

```c
^42^
```

`^(value)^`

### Print

```c
*0
```

`*(index)`

Leave empty to print the whole stack.

### Print ASCII

```c
**0
```

`**(index)`

This prints the ASCII value of the character at the given index.

Leave empty to print the whole stack.

## Hello World

```c
# Push the strings #

!72 # H #
!69 # E #
!76 # L #
!76 # L #
!79 # O #
!32 # Space #
!87 # W #
!79 # O #
!82 # R #
!76 # L #
!68 # D #
!33 # ! #
!33 # ! #

** # Prints the whole stack ASCII values #
```