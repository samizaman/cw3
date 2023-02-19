var vueInstance = new Vue({
    el: "#app",
    data: {
      lessons: lessons,
      cart: [],
      showLesson: true,
      sortBy: "",
      sortDirection: "",
      searchInput: "",
      phoneNumber: "",
      isValid: false,
      name: "",
    },
    methods: {
      addToCart(lesson) {
        this.cart.push(lesson);
        this.lessons.forEach((item) => {
          if (item.id === lesson.id) {
            item.space -= 1;
          }
        });
        console.log(this.cart);
      },
      // if showCheckout returns true it shows the lessons if its false it shows checkout
      showCheckout() {
        this.showLesson = !this.showLesson && this.cart.length > 0;
      },

      // Submits the form and resets to fresh homepage
      submitAndProcessOrder() {
        alert("Order Submitted");
        this.cart = [];
        this.showLesson = true;
        this.sortBy = "";
        this.sortDirection = "";
        this.searchInput = "";
      },
      // removes one lesson from the cart array and adds one space
      removeLessonFromCart(lesson) {
        const index = this.cart.indexOf(lesson);
        if (index >= 0) {
          this.cart.splice(index, 1);
        }
        this.lessons.forEach((item) => {
          if (item.id === lesson.id) {
            item.space += 1;
          }
        });
        console.log(this.cart.length);
      },
    },
    computed: {
      validateCart() {
        return this.cart.length > 0;
      },
      validateCheckoutInputs() {
        const letterRegex = /^[A-Za-z\s]*$/;
        const numberRegex = /^\d{10}$/;

        return this.name.match(letterRegex) && this.phoneNumber.match(numberRegex);
      },

      getTotalCartItemCount: function () {
        return this.cart.length || "";
      },
      // Sort lessons based on specified sortBy and sortDirection
      sortLessons() {
        if (this.searchInput) {
          return this.lessons.filter(lesson => {
            const subjectMatch = lesson.subject.toLowerCase().includes(this.searchInput.toLowerCase());
            const locationMatch = lesson.location.toLowerCase().includes(this.searchInput.toLowerCase());

            return subjectMatch || locationMatch;
          });
        }
        const sortFunctions = {
          subject: {
            ascending: (a, b) => a.subject.localeCompare(b.subject),
            descending: (a, b) => b.subject.localeCompare(a.subject),
          },
          price: {
            ascending: (a, b) => a.price - b.price,
            descending: (a, b) => b.price - a.price,
          },
          location: {
            ascending: (a, b) => a.location.localeCompare(b.location),
            descending: (a, b) => b.location.localeCompare(a.location),
          },
          availability: {
            ascending: (a, b) => a.space - b.space,
            descending: (a, b) => b.space - a.space,
          },
        };
        // Check if sort function exists based on sortBy and sortDirection
        const sortFunction = sortFunctions[this.sortBy]?.[this.sortDirection];

        // If sort function exists, sort lessons and return sorted lessons
        if (sortFunction) {
          return this.lessons.sort(sortFunction);
        }

        // If sortBy and sortDirection are not specified, return original lessons
        return this.lessons;
      },
    },
  });